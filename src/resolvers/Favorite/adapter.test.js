import { adaptPlace, adaptRequest, adaptFavorites } from './adapter'

describe('Favorite Adapter', () => {
  describe('adaptPlace function', () => {
    it('adapts correctly a place', () => {
      const expected = {
        location: {
          create: {
            lat: 10,
            lng: 10
          }
        },
        types: {
          set: ['1', '2']
        },
        placeId: '1',
        name: 'name',
        rating: 'rating',
        priceLevel: 'priceLevel',
        totalRatings: 'totalRatings'
      }
      const place = {
        location: {
          lat: 10,
          lng: 10
        },
        types: ['1', '2'],
        id: '1',
        name: 'name',
        rating: 'rating',
        priceLevel: 'priceLevel',
        totalRatings: 'totalRatings'
      }

      expect(adaptPlace(place)).toEqual(expected)
    })
  })

  describe('adaptRequest function', () => {
    it('adapts a full request with dateAdded with asc', () => {
      const expected = {
        first: 10,
        skip: 10,
        orderBy: 'createdAt_ASC'
      }
      const request = {
        limit: 10,
        page: 1,
        sortBy: 'dateAdded',
        sortType: 'asc'
      }

      expect(adaptRequest(request)).toEqual(expected)
    })

    it('adapts a full request with dateAdded with desc', () => {
      const expected = {
        first: 10,
        skip: 10,
        orderBy: 'createdAt_DESC'
      }
      const request = {
        limit: 10,
        page: 1,
        sortBy: 'dateAdded',
        sortType: 'desc'
      }

      expect(adaptRequest(request)).toEqual(expected)
    })

    it('adapts a full request without page', () => {
      const expected = {
        first: 10
      }
      const request = {
        limit: 10
      }

      expect(adaptRequest(request)).toEqual(expected)
    })
  })

  describe('adaptFavorites function', () => {
    it('adapts a favorite by prominence', () => {
      const request = {
        sortBy: 'prominence',
        sortType: 'desc'
      }
      const favorites = [
        {
          place: { rating: 4, distance: 2 }
        },
        {
          place: { rating: 2, distance: 4 }
        },
        {
          place: { rating: 3, distance: 3 }
        }
      ]
      const adaptedFavorites = [
        {
          place: { rating: 4, distance: 2 }
        },
        {
          place: { rating: 3, distance: 3 }
        },
        {
          place: { rating: 2, distance: 4 }
        }
      ]

      expect(adaptFavorites(favorites, request)).toEqual(adaptedFavorites)
    })

    it('adapts a favorite by distance', () => {
      const request = {
        sortBy: 'distance',
        sortType: 'desc',
        location: {
          lat: 1, lng: 1
        }
      }
      const favorites = [
        {
          place: { rating: 4, location: { lat: 2, lng: 2 } }
        },
        {
          place: { rating: 2, location: { lat: 10, lng: 10 } }
        },
        {
          place: { rating: 3, location: { lat: 100, lng: 100 } }
        }
      ]
      const adaptedFavorites = [
        {
          place: { rating: 3, location: { lat: 100, lng: 100 }, distance: 9724912 }
        },
        {
          place: { rating: 2, location: { lat: 10, lng: 10 }, distance: 1411276 }
        },
        {
          place: { rating: 4, location: { lat: 2, lng: 2 }, distance: 157225 }
        }
      ]

      expect(adaptFavorites(favorites, request)).toEqual(adaptedFavorites)
    })

    it('it doesnt adapt if no sorts', () => {
      const favorites = [
        {
          place: { rating: 4, distance: 2 }
        },
        {
          place: { rating: 2, distance: 4 }
        },
        {
          place: { rating: 3, distance: 3 }
        }
      ]
      const request = {}

      expect(adaptFavorites(favorites, request)).toEqual(favorites)
    })
  })
})
