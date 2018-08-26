/* eslint-disable global-require */

// The top-level (parent) route
const routes = {
  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      name: 'home',
      path: '',
      load: () => import(/* webpackChunkName: 'home' */ './home'),
    },
    {
      name: 'category',
      path: '/category/:categoryKey',
      load: () => import(/* webpackChunkName: 'home' */ './home'),
    },
    {
      name: 'article',
      path: '/article/:articleKey',
      load: () => import(/* webpackChunkName: 'article' */ './article'),
    },
    {
      name: 'contact',
      path: '/contact',
      load: () => import(/* webpackChunkName: 'contact' */ './contact'),
    },
    {
      name: 'about',
      path: '/about',
      load: () => import(/* webpackChunkName: 'about' */ './about'),
    },

    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - ${process.env.APP_NAME}`;
    route.description = route.description || '';

    return route;
  },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;
