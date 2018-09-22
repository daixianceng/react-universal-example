import 'whatwg-fetch';
import 'typeface-roboto/index.css';
import 'github-markdown-css/github-markdown.css';
import Cookies from 'universal-cookie';
import React from 'react';
import ReactDOM from 'react-dom';
import deepForceUpdate from 'react-deep-force-update';
import { create as createJss } from 'jss';
import jssPreset from 'jss-preset-default';
import { JssProvider } from 'react-jss';
import { cloneDeep } from 'lodash';
import queryString from 'query-string';
import { createPath } from 'history/PathUtils';
import { MuiThemeProvider } from '@material-ui/core/styles';
import App from './components/App';
import createFetch from './createFetch';
import configureStore from './store/configureStore';
import { updateMeta } from './DOMUtils';
import history from './history';
import createApolloClient from './core/createApolloClient';
import router from './router';
import getTheme from './getTheme';

// Creates cookies
const cookies = new Cookies();

// Universal HTTP client
const fetch = createFetch(window.fetch, {
  baseUrl: window.App.apiUrl,
});

const apolloClient = createApolloClient();

// Global (context) variables that can be easily accessed from any React component
// https://facebook.github.io/react/docs/context.html
const context = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(x => x._insertCss());
    return () => {
      removeCss.forEach(f => f());
    };
  },
  cookies,
  // For react-apollo
  client: apolloClient,
  // Initialize a new Redux store
  // http://redux.js.org/docs/basics/UsageWithReact.html
  store: configureStore(window.App.state, { apolloClient, fetch, history }),
  fetch,
  storeSubscription: null,
};

window.AppContext = context;

const container = document.getElementById('app');
let currentLocation = history.location;
let appInstance;

const scrollPositionsHistory = {};

// Creates JSS with default presets
// https://github.com/cssinjs/jss-preset-default
const jss = createJss(jssPreset());

// Re-render the app when window.location changes
async function onLocationChange(location, action) {
  // Remember the latest scroll position for the previous location
  scrollPositionsHistory[currentLocation.key] = {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
  };
  // Delete stored scroll position for next page if any
  if (action === 'PUSH') {
    delete scrollPositionsHistory[location.key];
  }

  let pos;
  if (location.state && location.state.keepPosition) {
    pos = scrollPositionsHistory[currentLocation.key];
  } else {
    pos = scrollPositionsHistory[location.key];
  }
  currentLocation = location;

  const isInitialRender = !action;
  try {
    context.pathname = location.pathname;
    context.query = queryString.parse(location.search);

    // Traverses the list of routes in the order they are defined until
    // it finds the first route that matches provided URL path string
    // and whose action method returns anything other than `undefined`.
    const route = await router.resolve(context);

    // Prevent multiple page renders during the routing process
    if (currentLocation.key !== location.key) {
      return;
    }

    if (route.redirect) {
      history.replace(route.redirect);
      return;
    }

    // Gets current theme via cookies
    const theme = getTheme(cookies.get('theme'));

    // const renderReactApp = isInitialRender ? ReactDOM.hydrate : ReactDOM.render;
    const renderReactApp = ReactDOM.render;
    appInstance = renderReactApp(
      <JssProvider jss={jss}>
        <MuiThemeProvider theme={theme.source}>
          <App context={context}>{route.component}</App>
        </MuiThemeProvider>
      </JssProvider>,
      container,
      () => {
        if (isInitialRender) {
          // Switch off the native scroll restoration behavior and handle it manually
          // https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
          if (window.history && 'scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
          }

          const elem = document.getElementById('css');
          if (elem) elem.parentNode.removeChild(elem);
          const jssElem = document.getElementById('jss');
          if (jssElem) jssElem.parentNode.removeChild(jssElem);
          return;
        }

        document.title = route.title;

        updateMeta('description', route.description);
        // Update necessary tags in <head> at runtime here, ie:
        // updateMeta('keywords', route.keywords);
        // updateCustomMeta('og:url', route.canonicalUrl);
        // updateCustomMeta('og:image', route.imageUrl);
        // updateLink('canonical', route.canonicalUrl);
        // etc.

        let scrollX = 0;
        let scrollY = 0;
        if (pos) {
          scrollX = pos.scrollX;
          scrollY = pos.scrollY;
        } else {
          const targetHash = location.hash.substr(1);
          if (targetHash) {
            const target = document.getElementById(targetHash);
            if (target) {
              scrollY = window.pageYOffset + target.getBoundingClientRect().top;
            }
          }
        }

        // Restore the scroll position if it was saved into the state
        // or scroll to the given #hash anchor
        // or scroll to top of the page
        window.scrollTo(scrollX, scrollY);

        // Google Analytics tracking. Don't send 'pageview' event after
        // the initial rendering, as it was already sent
        if (window.ga) {
          window.ga('send', 'pageview', createPath(location));
        }
      },
    );
  } catch (error) {
    if (__DEV__) {
      throw error;
    }

    console.error(error);

    // Do a full page reload if error occurs during client-side navigation
    if (!isInitialRender && currentLocation.key === location.key) {
      console.error('RSK will reload your page after error');
      window.location.reload();
    }
  }
}

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/mjackson/history#readme
history.listen(onLocationChange);
onLocationChange(currentLocation);

window.rerender = () => {
  const location = cloneDeep(currentLocation);
  location.state = location.state || {};
  location.state.keepPosition = true;
  // Triggers location change event.
  history.replace(location);
};

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./router', () => {
    if (appInstance && appInstance.updater.isMounted(appInstance)) {
      // Force-update the whole tree, including components that refuse to update
      deepForceUpdate(appInstance);
    }

    onLocationChange(currentLocation);
  });
}
