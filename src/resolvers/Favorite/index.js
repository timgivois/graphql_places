import { getUserId } from 'graphql-authentication'

import { getPlace } from '../Place'
import { adaptPlace, adaptRequest, adaptFavorites } from './adapter'

const addFavorite = async (_, request, context, info) => {
  const place = await getPlace(_, { placeId: request.placeId })
  const userId = await getUserId(context)
  const adaptedPlace = adaptPlace(place)

  return context.db.mutation.createFavorite({
    data: {
      user: { connect: { id: userId } },
      place: { create: adaptedPlace }
    }
  }, info)
}

const getFavorites = async (_, request, context, info) => {
  const userId = await getUserId(context)
  const adapatedRequest = adaptRequest(request)

  const favorites = await context.db.query.favorites({
    where: { user: { id: userId } },
    ...adapatedRequest
  }, info)

  return adaptFavorites(favorites, request)
}

export default {
  Query: {
    getFavorites
  },
  Mutation: {
    addFavorite
  }
}
