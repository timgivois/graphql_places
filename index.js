import { GraphQLServer } from 'graphql-yoga'
import { Prisma } from 'prisma-binding'
import { graphqlAuthenticationConfig } from 'graphql-authentication'
import { GraphqlAuthenticationPrismaAdapter } from 'graphql-authentication-prisma'

import { resolvers } from './src/resolvers'
import { authMiddleware } from './src/middlewares'

require('dotenv').config()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  middlewares: [authMiddleware],
  context: req => ({
    ...req,
    graphqlAuthentication: graphqlAuthenticationConfig({
      // Required, see for more info the "Writing an adapter" section on this page
      adapter: new GraphqlAuthenticationPrismaAdapter({}),
      // Required, used for signing JWT tokens
      secret: process.env.JWT_SECRET
    }),
    db: new Prisma({
      typeDefs: './src/generated/prisma.graphql',
      endpoint: process.env.PRISMA_ENDPOINT,
      secret: process.env.PRISMA_SECRET,
      debug: process.env.NODE_ENV === 'env'
    })
  })
})

server.start().then(() => {
  console.log('🚀  Server ready at http://localhost:4000')
})
