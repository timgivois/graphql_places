import GoogleMaps from '../../services/googlemaps'
import { placesRequestAdapter, placeRequestAdapter } from './adapter'

const googleMapsService = new GoogleMaps()

const getPlaces = async (_, request) => {
  const query = placesRequestAdapter(request)
  const places = await googleMapsService.getPlaces(query, request.location)

  return places || []
}

export const getPlace = async (_, request) => {
  const { placeId, location } = placeRequestAdapter(request)
  const place = await googleMapsService.getPlace(placeId, location)

  return place
}

export default {
  Query: {
    getPlaces,
    getPlace
  }
}
