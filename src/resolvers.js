import merge from 'lodash/merge'
import { authQueries, authMutations } from 'graphql-authentication'

import PlacesResolvers from './resolvers/Place'
import FavoriteResolvers from './resolvers/Favorite'

const resolvers = merge({},
  PlacesResolvers,
  FavoriteResolvers,
  {
    Query: {
      currentUser: authQueries.currentUser
    },
    Mutation: {
      login: authMutations.login,
      signup: authMutations.signup
    }
  }
)

export { resolvers }
