import googleMapsClient from '@google/maps'
import util from 'util'
import uniqueId from 'lodash/uniqueId'

import RedisService from '../redis'
import { placeAdpter, tokenAdapter } from './adapter'
import { API_KEY } from './config'

class GoogleMaps {
  constructor () {
    this.client = googleMapsClient.createClient({
      key: API_KEY,
      Promise: Promise
    })
    this.redis = new RedisService()
  }

  getPlaces (query, point) {
    const getNearbyPromise = util.promisify(this.redis.getNearby).bind(this.redis)
    const addLocationPromise = util.promisify(this.redis.addLocation).bind(this.redis)

    return getNearbyPromise(query.location)
      .then(data => {
        console.log('cache hit')
        return data
      })
      .catch(errors => {
        console.log(errors)
        console.log('cache miss')
        return this.client.placesNearby(query)
          .asPromise()
          .then(response => {
            const places = response.json.results.map(each => placeAdpter(each, point))
            const nextPageToken = tokenAdapter(response.json)
            const placesResponse = {
              places,
              nextPageToken
            }

            return addLocationPromise(uniqueId(), query.location, placesResponse)
          })
          .then((placesResponse) => placesResponse)
          .catch(error => {
            console.log(error)

            throw new Error('Something went wrong with the request to Google')
          })
      })
  }

  getPlace (id, point) {
    const query = {
      placeid: id
    }

    return this.client.place(query)
      .asPromise()
      .then(response => {
        const place = placeAdpter(response.json.result, point)
        return place
      }).catch(error => {
        console.log(error)

        throw new Error('Something went wrong with the request to Google')
      })
  }
}

export default GoogleMaps
