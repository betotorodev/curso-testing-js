/* eslint-disable semi */
const BooksService = require('./books.service')

const fakeBooks = [
  {
    _id: 1,
    name: 'Harry Potter',
  },
]

const mockGetAll = jest.fn()

jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => {},
})))

describe('BooksService', () => {
  let service
  beforeEach(() => {
    service = new BooksService()
    jest.clearAllMocks()
  })

  describe('test for getBooks', () => {
    test('should return a list book', async () => {
      mockGetAll.mockResolvedValue(fakeBooks)

      const books = await service.getBooks({})

      expect(books.length).toBe(1)
      expect(mockGetAll).toHaveBeenCalledWith('books', {})
      expect(mockGetAll).toHaveBeenCalled()
      expect(mockGetAll).toHaveBeenCalledTimes(1)
    })
    test('should return harry potter', async () => {
      const books = await service.getBooks({})

      expect(books[0].name).toBe('Harry Potter')
    })
  })
})
