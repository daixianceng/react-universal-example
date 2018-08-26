import UniversalRouter from 'universal-router';
import generateUrls from 'universal-router/generateUrls';
import queryString from 'query-string';
import routes from './routes';

const router = new UniversalRouter(routes, {
  baseUrl: process.env.APP_BASE_URL,
  resolveRoute(context, params) {
    if (typeof context.route.load === 'function') {
      return context.route
        .load()
        .then(action => action.default(context, params));
    }
    if (typeof context.route.action === 'function') {
      return context.route.action(context, params);
    }
    return undefined;
  },
});

export const toUrl = generateUrls(router, {
  stringifyQueryParams: queryString.stringify,
});
export default router;
