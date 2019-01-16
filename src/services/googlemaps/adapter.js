import { getDistanceFromLatLonInM } from '../../utils'

export const placeAdpter = (row, point) => ({
  location: row.geometry.location,
  id: row.place_id,
  name: row.name,
  types: row.types,
  rating: row.rating,
  distance: getDistanceFromLatLonInM(row.geometry.location.lat, row.geometry.location.lng, point.lat, point.lng),
  priceLevel: row.price_level,
  totalRatings: row.user_ratings_total
})

export const tokenAdapter = (response) => response.next_page_token
