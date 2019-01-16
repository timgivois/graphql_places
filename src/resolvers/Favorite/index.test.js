import FavoriteResolver from './index'

describe('FavoriteResolver', () =>  {
  describe('deleteFavorite', () => {
    it('calls deleteFavorite', () => {
      const mockDeleteFavorite = jest.fn()
      const context = {
        db: {
          mutation: {
            deleteFavorite: mockDeleteFavorite
          }
        }
      }

      FavoriteResolver.Mutation.deleteFavorite(undefined, {}, context, {})
      expect(mockDeleteFavorite).toHaveBeenCalled()
    })
  })
})
