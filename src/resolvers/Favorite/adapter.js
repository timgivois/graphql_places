import orderBy from 'lodash/orderBy'

import { getDistanceFromLatLonInM } from '../../utils'

export const adaptPlace = (place) => ({
  location: { create: { lat: place.location.lat, lng: place.location.lng } },
  types: { set: place.types },
  placeId: place.id,
  name: place.name,
  rating: place.rating,
  priceLevel: place.priceLevel,
  totalRatings: place.totalRatings
})

export const adaptRequest = (request) => {
  const result = {
    first: request.limit
  }

  if (request.page) {
    result.skip = request.limit * request.page
  }

  if (request.sortBy === 'dateAdded') {
    if (request.sortType === 'desc') {
      result.orderBy = 'createdAt_DESC'
    } else {
      result.orderBy = 'createdAt_ASC'
    }
  }

  return result
}

export const adaptFavorites = (favorites, request) => {
  if (request.sortBy === 'prominence') {
    return orderBy(favorites, ['place.rating'], request.sortType)
  }

  if (request.sortBy === 'distance' && request.location) {
    favorites.forEach(favorite => {
      favorite.place.distance = getDistanceFromLatLonInM(favorite.place.location.lat, favorite.place.location.lng, request.location.lat, request.location.lng)
    })
    return orderBy(favorites, ['place.distance'], request.sortType)
  }

  return favorites
}
