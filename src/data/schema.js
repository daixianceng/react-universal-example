import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import {
  schema as apiSchema,
  resolvers as apiResolvers,
  queries as apiQueries,
} from './graphql/api/schema';

import {
  schema as DatabaseSchema,
  resolvers as DatabaseResolvers,
  mutations as DatabaseMutations,
  queries as DatabaseQueries,
} from './graphql/database/schema';

const RootQuery = [
  `
  type RootQuery {
    ${apiQueries}
    ${DatabaseQueries}
  }
`,
];

const Mutation = [
  `
  type Mutation {
    ${DatabaseMutations}
  }
`,
];

const SchemaDefinition = [
  `
  schema {
    query: RootQuery
    mutation: Mutation
  }
`,
];

// Merge all of the resolver objects together
// Put schema together into one array of schema strings
const resolvers = merge(apiResolvers, DatabaseResolvers);

const schema = [
  ...SchemaDefinition,
  ...RootQuery,
  ...Mutation,

  ...apiSchema,
  ...DatabaseSchema,
];

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
  ...(__DEV__ ? { log: e => console.error(e.stack) } : {}),
});
