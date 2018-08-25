// @flow

import type { Request } from 'express';
import DataLoader from 'dataloader';

import { fetchAllCategories, fetchPost } from './graphql/api/functions';

class Context {
  constructor(req: Request) {
    // todo request some things
  }

  categoryLoader = new DataLoader(keys =>
    Promise.all(
      keys.map(key => {
        if (key === 'all') {
          return fetchAllCategories();
        }
        return null;
      })
    ),
  );

  postLoader = new DataLoader(keys =>
    Promise.all(keys.map(key => fetchPost(key))),
  );
}

export default Context;
