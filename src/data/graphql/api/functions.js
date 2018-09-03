import fetch from 'node-fetch';

const url = process.env.GRAPHQL_API_URL;

/**
 * Fetch all categories
 *
 * @return Promise<[]>
 */
export function fetchAllCategories() {
  return fetch(`${url}/v1/categories-with-posts`)
    .then(response => response.json())
    .then(result => {
      if (result.status === 'success') {
        return result.data;
      }

      return [];
    });
}

/**
 * Fetch post
 *
 * @return Promise<Post|null>
 */
export function fetchPost(key) {
  return fetch(`${url}/v1/post/${key}`)
    .then(response => response.json())
    .then(result => {
      if (result.status === 'success') {
        return result.data;
      }

      return null;
    });
}

/**
 * Fetch posts list
 *
 * @return Promise<Object|null>
 */
export function fetchPosts(categoryId, page) {
  return fetch(
    `${url}/v1/posts?PostSearch%5BcategoryId%5D=${categoryId}&PostSearch%5Bstatus%5D=1&page=${page}&per-page=10&sort=-id`,
  )
    .then(response => response.json())
    .then(result => {
      if (result.status === 'success') {
        return result.data;
      }

      return null;
    });
}
