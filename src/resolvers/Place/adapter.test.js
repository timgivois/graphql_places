import { placesRequestAdapter,  placeRequestAdapter } from './adapter'

describe('Place Adapter', () => {
  describe('placeRequestAdapter', () => {
    it('adapts a complete request', () => {
      const request = {
        placeId: 1,
        location: {
          lat: 10,
          lng: 10
        }
      }
      const adaptedRequest = {
        placeId: 1,
        location: {
          lat: 10,
          lng: 10
        }
      }

      expect(placeRequestAdapter(request)).toEqual(adaptedRequest)
    })
    it('adapts an incomplete request', () => {
      const request = {
        placeId: 1
      }
      const adaptedRequest = {
        placeId: 1,
        location: {
          lat: null,
          lng: null
        }
      }

      expect(placeRequestAdapter(request)).toEqual(adaptedRequest)
    })
  })

  describe('placesRequestAdapter', () => {
    it('apdats a request with sortBy!==distance and nextPageToken', () => {
      const request = {
        query: 'restaurant',
        sortBy: 'prominence',
        distance: 100,
        nextPageToken: '123'
      }
      const adaptedRequest = {
        keyword: 'restaurant',
        rankby: 'prominence',
        radius: 100,
        pagetoken: '123'
      }

      expect(placesRequestAdapter(request)).toEqual(adaptedRequest)
    })

    it('apdats a request with sortBy==distance and nextPageToken', () => {
      const request = {
        query: 'restaurant',
        sortBy: 'distance',
        distance: 100,
        nextPageToken: '123'
      }
      const adaptedRequest = {
        keyword: 'restaurant',
        rankby: 'distance',
        pagetoken: '123'
      }

      expect(placesRequestAdapter(request)).toEqual(adaptedRequest)
    })

    it('apdats a request with sortBy==distance without nextPageToken', () => {
      const request = {
        query: 'restaurant',
        sortBy: 'distance',
        distance: 100
      }
      const adaptedRequest = {
        keyword: 'restaurant',
        rankby: 'distance',
        location: { lat: null, lng: null }
      }

      expect(placesRequestAdapter(request)).toEqual(adaptedRequest)
    })

    it('apdats a request with sortBy==distance without nextPageToken and with distance', () => {
      const request = {
        query: 'restaurant',
        sortBy: 'distance',
        distance: 100,
        location: { lat: 10, lng: 10 }
      }
      const adaptedRequest = {
        keyword: 'restaurant',
        rankby: 'distance',
        location: { lat: 10, lng: 10 }
      }

      expect(placesRequestAdapter(request)).toEqual(adaptedRequest)
    })
  })
})
