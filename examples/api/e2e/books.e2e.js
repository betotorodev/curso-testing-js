const mockGetAll = jest.fn()
const request = require('supertest')
const createApp = require('../src/app')

const fakeBooks = [
  {
    _id: 1,
    name: 'Harry Potter',
  },
]


jest.mock('../src/lib/mongo.lib', () => jest.fn().mockImplementation(() => {
  return {
  getAll: mockGetAll,
  create: () => {},
}
}))

describe('test for books', () => {
  let app
  let server
  beforeAll(() => {
    app = createApp()
    server = app.listen(3001)
  })
  afterAll(async () => {
    await server.close()
  })
  
  describe('test for [GET] /api/v1/books', () => {
    test('should return a list of books', () => { 
      mockGetAll.mockResolvedValue(fakeBooks)

      return request(app)
        .get('/api/v1/books')
        .expect(200)
        .then(({ body }) => {
          console.log(body)
          expect(body.length).toBe(1)
      })
    })
  })
})