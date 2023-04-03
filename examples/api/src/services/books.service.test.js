/* eslint-disable semi */
const BooksService = require('./books.service')

const fakeBooks = [
  {
    _id: 1,
    name: 'Harry Potter',
  },
]

const mongoLibStub = {
  getAll: () => [...fakeBooks],
  create: () => {},
}

jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => mongoLibStub))

describe('BooksService', () => {
  let service
  beforeEach(() => {
    service = new BooksService()
  })

  describe('test for getBooks', () => {
    test('should return a list book', async () => {
      const books = await service.getBooks({})

      expect(books.length).toBe(1)
    })
  })
})
