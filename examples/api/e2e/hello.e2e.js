const request = require('supertest')
const createApp = require('../src/app')

describe('Hello world', () => {
  let app
  let server
  beforeAll(() => {
    app = createApp()
    server = app.listen(3001)
  })
  afterAll(async () => {
    await server.close()
  })

  test('should return Hello World', () => { 
    return request(app)
      .get('/')
      .expect(200)
      .then(response => {
        expect(response.text).toEqual('Hello World!')
      })
   })
})