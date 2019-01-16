import { shield, rule } from 'graphql-shield'
import { isAuthResolver } from 'graphql-authentication'

const isAuth = rule()(isAuthResolver)

const permissions = shield({
  Query: {
    getPlaces: isAuth,
    getPlace: isAuth,
    getFavorites: isAuth
  },
  Mutation: {
    addFavorite: isAuth,
    deleteFavorite: isAuth
  }
})

export default permissions
