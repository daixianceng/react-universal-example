import gql from 'graphql-tag';
import {
  GET_CATEGORIES_START,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
} from '../constants';
import { setError } from './notification';

export function getAllCategories() {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: GET_CATEGORIES_START,
    });

    try {
      const { data } = await client.query({
        query: gql`
          query Query {
            getAllCategories {
              id
              key
              name
              sequence
              posts
            }
          }
        `,
      });
      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        data: data.getAllCategories,
      });
    } catch (error) {
      dispatch({
        type: GET_CATEGORIES_FAIL,
      });
      dispatch(setError(error));
    }
  };
}

export function getAllCategoriesIfNeeded() {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.category.all && !state.category.loading) {
      dispatch(getAllCategories());
    }
  };
}
