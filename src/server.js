import 'typeface-roboto/index.css';
import 'github-markdown-css/github-markdown.css';
import path from 'path';
import Promise from 'bluebird';
import express from 'express';
import useragent from 'useragent';
import Cookies from 'universal-cookie';
import bodyParser from 'body-parser';
import { graphql } from 'graphql';
import expressGraphQL from 'express-graphql';
import nodeFetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { getDataFromTree } from 'react-apollo';
import { create as createJss } from 'jss';
import jssPreset from 'jss-preset-default';
import { JssProvider, SheetsRegistry } from 'react-jss';
import PrettyError from 'pretty-error';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createApolloClient from './core/createApolloClient';
import App from './components/App';
import Html from './components/Html';
import createFetch from './createFetch';
import router from './router';
import schema from './data/schema';
import Context from './data/Context';
// import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
import getTheme from './getTheme';
import { getInitialWidthByUserAgent } from './utils';
import config from './config';

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

// Material UI initial width defaults to `lg`
global.muiInitialWidth = 'lg';

const app = express();

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', config.trustProxy);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use((req, res, next) => {
  // https://github.com/3rd-Eden/useragent
  req.useragent = useragent[__DEV__ ? 'parse' : 'lookup'](
    req.headers['user-agent'],
  );
  global.muiInitialWidth = getInitialWidthByUserAgent(req.useragent);
  next();
});
app.use((req, res, next) => {
  req.cookies = new Cookies(req.headers.cookie);
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Register API middleware
// -----------------------------------------------------------------------------
// https://github.com/graphql/express-graphql#options
const graphqlMiddleware = expressGraphQL(req => ({
  schema,
  graphiql: __DEV__,
  context: new Context(req),
  rootValue: { request: req },
  pretty: __DEV__,
}));

app.use('/graphql', graphqlMiddleware);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const css = new Set();

    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()));
    };

    const apolloClient = createApolloClient({
      schema,
      rootValue: { request: req },
      context: new Context(req),
    });

    // Universal HTTP client
    const fetch = createFetch(nodeFetch, {
      baseUrl: config.api.serverUrl,
      cookie: req.headers.cookie,
      apolloClient,
      schema,
      graphql,
    });

    const initialState = {};

    const store = configureStore(initialState, {
      apolloClient,
      cookie: req.headers.cookie,
      fetch,
      // I should not use `history` on server.. but how I do redirection? follow universal-router
      history: null,
    });

    store.dispatch(
      setRuntimeVariable({
        name: 'initialNow',
        value: Date.now(),
      }),
    );

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      insertCss,
      cookies: req.cookies,
      fetch,
      // The twins below are wild, be careful!
      pathname: req.path,
      query: req.query,
      // You can access redux through react-redux connect
      store,
      storeSubscription: null,
      // Apollo Client for use with react-apollo
      client: apolloClient,
    };

    const route = await router.resolve(context);

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };

    // Creates JSS with default presets
    // https://github.com/cssinjs/jss-preset-default
    const jss = createJss(jssPreset());
    // JSS Server side rendering
    // https://github.com/cssinjs/react-jss#server-side-rendering
    const sheets = new SheetsRegistry();
    const sheetsManager = new Map();
    const theme = getTheme(req.cookies.get('theme'));
    const rootComponent = props => (
      <JssProvider jss={jss} registry={sheets} {...props}>
        <MuiThemeProvider theme={theme.source} sheetsManager={sheetsManager}>
          <App context={context}>{route.component}</App>
        </MuiThemeProvider>
      </JssProvider>
    );
    await getDataFromTree(rootComponent({ disableStylesGeneration: true }));
    // this is here because of Apollo redux APOLLO_QUERY_STOP action
    await Promise.delay(0);
    data.children = await ReactDOM.renderToString(rootComponent());
    data.styles = [
      { id: 'css', cssText: [...css].join('') },
      { id: 'jss', cssText: sheets.toString() },
    ];

    const scripts = new Set();
    const links = new Set();
    const addChunk = chunk => {
      if (chunks[chunk]) {
        chunks[chunk].forEach(asset => {
          if (/\.js$/.test(asset)) {
            scripts.add(asset);
          } else {
            links.add(asset);
          }
        });
      } else if (__DEV__) {
        throw new Error(`Chunk with name '${chunk}' cannot be found`);
      }
    };
    addChunk('client');
    if (route.chunk) addChunk(route.chunk);
    if (route.chunks) route.chunks.forEach(addChunk);
    data.scripts = Array.from(scripts);
    data.links = Array.from(links);

    // Furthermore invoked actions will be ignored, client will not receive them!
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('Serializing store...');
    }
    data.app = {
      apiUrl: config.api.clientUrl,
      state: context.store.getState(),
      apolloState: context.client.extract(),
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html title="Internal Server Error" description={err.message}>
      {ReactDOM.renderToString(
        <>
          <h1>{err.name}</h1>
          <pre>{err.stack}</pre>
        </>,
      )}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
if (!module.hot) {
  app.listen(config.port, () => {
    console.info(`The server is running at http://localhost:${config.port}/`);
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;
