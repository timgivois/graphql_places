import redis from 'redis'
import georedis from 'georedis'

import { host, port, nearbyTreshold } from './config'

const NO_DATA = 'no data'

class Redis {
  constructor () {
    this.client = redis.createClient({ host, port })
    this.geo = georedis.initialize(this.client)
  }

  addLocation (id, location, response, cb) {
    this.geo.addLocation(id, { latitude: location.lat, longitude: location.lng },
      (err) => {
        if (err) {
          console.log(err)
          cb(err, null)
        }
        this.client.set(id, JSON.stringify(response), (error, val) => {
          if (error) {
            console.log(error)
            cb(error, null)
          }
          cb(null, response)
        })
      })
  }

  getNearby (location, cb) {
    this.geo.nearby({ latitude: location.lat, longitude: location.lng }, nearbyTreshold,
      (err, locations) => {
        if (err) {
          console.log(err)
        } else if (locations && locations.length > 0) {
          this.client.get(locations[0], (error, val) => {
            if (error) {
              console.log(error)
              cb(error, null)
            }
            const parsedValue = JSON.parse(val)
            cb(null, parsedValue)
          })
        } else {
          cb(NO_DATA, null)
        }
      }
    )
  }
}

export default Redis
