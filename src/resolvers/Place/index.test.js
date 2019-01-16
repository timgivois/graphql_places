import GoogleMaps from '../../services/googlemaps'
import placeResolver from './index'

const mockGetPlacesMock = jest.fn().mockImplementation(() => Promise.resolve())
const mockGetPlaceMock = jest.fn().mockImplementation(() => Promise.resolve())
jest.mock('../../services/googlemaps', () => {
  return jest.fn().mockImplementation(() => ({
    getPlaces: mockGetPlacesMock,
    getPlace: mockGetPlaceMock
  }))
})


describe('Place resolver', () => {
  describe('getPlaces', () => {
    it('calls getPlaces from google maps service', async () => {
      expect.assertions(1)
      const request = {
        query: 'restaurant',
        sortBy: 'distance',
        distance: 100,
        location: { lat: 10, lng: 10 }
      }

      await placeResolver.Query.getPlaces(undefined, request)

      expect(mockGetPlacesMock).toHaveBeenCalled()
    })
  })

  describe('getPlace', () => {
    it('calls getPlace from google maps service', async () => {
      expect.assertions(1)
      const request = {
        query: 'restaurant',
        sortBy: 'distance',
        distance: 100,
        location: { lat: 10, lng: 10 }
      }

      await placeResolver.Query.getPlace(undefined, request)

      expect(mockGetPlaceMock).toHaveBeenCalled()
    })
  })
})
