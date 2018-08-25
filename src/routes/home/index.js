import React from 'react';
import Layout from 'components/Layout';
import ErrorPage from '../error/ErrorPage';
import Home from './Home';
import gqlQuery from './query.graphql';

async function action({ client, params, query }) {
  let result;
  let title = 'Home';
  let component;

  try {
    result = await client.query({
      query: gqlQuery,
      variables: {
        categoryKey: params.categoryKey,
        page: Number.parseInt(query.page, 10) || 1,
      },
    });
    if (!result.data || !result.data.getPosts) {
      throw new Error("Can't get posts");
    }
    component = (
      <Layout>
        <Home data={result.data.getPosts} />
      </Layout>
    );
  } catch (error) {
    title = error.name;
    component = <ErrorPage error={error} />;
  }

  return {
    title,
    component,
  };
}

export default action;
