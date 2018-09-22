import React from 'react';
import Layout from '../../components/Layout';
import ErrorPage from '../error/ErrorPage';
import NotFound from '../not-found/NotFound';
import Article from './Article';
import query from './query.graphql';

async function action({ client, params }) {
  let result;
  let title;
  let description;
  let component;

  try {
    result = await client.query({
      query,
      variables: { id: params.articleKey },
    });
    if (result.data && result.data.getPost) {
      title = result.data.getPost.title;
      description = result.data.getPost.intro;
      component = (
        <Layout>
          <Article post={result.data.getPost} />
        </Layout>
      );
    } else {
      title = 'Post does not exist';
      component = <NotFound />;
    }
  } catch (error) {
    title = error.name;
    component = <ErrorPage error={error} />;
  }

  return {
    title,
    description,
    component,
  };
}

export default action;
