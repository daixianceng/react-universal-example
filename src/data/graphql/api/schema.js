import gql from 'graphql-tag';
import { fetchPosts } from './functions';

export const schema = [
  gql`
    type Category {
      id: ID
      key: ID
      name: String
      sequence: String
      posts: String
    }

    type Post {
      id: ID
      categoryId: Int
      title: String
      key: ID
      tags: String
      tagCollection: [String!]
      cover: String
      coverURL: String
      intro: String
      content: String
      authorId: Int
      status: Int
      statusLabel: String
      isEnabled: Boolean
      sequence: Int
      createdAt: Int
      updatedAt: Int
    }

    type Pagination {
      currentPage: Int
      pageCount: Int
      perPage: Int
      totalCount: Int
    }

    type DataResults {
      items: [Post]!
      pagination: Pagination!
    }
  `,
];

export const queries = [
  `
    getAllCategories: [Category]!
    getPost(key: ID!): Post
    getPosts(categoryKey: String, page: Int = 1): DataResults!
`,
];

export const resolvers = {
  RootQuery: {
    getAllCategories(obj, args, context) {
      return context.categoryLoader.load('all');
    },
    getPost(obj, args, context) {
      return context.postLoader.load(args.key);
    },
    async getPosts(obj, args, context) {
      let category;
      if (args.categoryKey) {
        const categories = await context.categoryLoader.load('all');
        category = categories.find(item => item.key === args.categoryKey);
      }

      const result = await fetchPosts(category ? category.id : '', args.page);

      return {
        items: result.items,
        pagination: result._meta, // eslint-disable-line no-underscore-dangle
      };
    },
  },
};
