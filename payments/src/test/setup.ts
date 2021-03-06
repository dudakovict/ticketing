import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../app'
import jwt from 'jsonwebtoken'
 
declare global {
  var signup: (id?: string) => string[]
}

jest.mock('../nats-wrapper')

process.env.STRIPE_KEY = 'sk_test_51JtGnILth5FrHdLXEH3XoCohwvtdrbP3iwwTTh9uQsz772oY3DeUloEY6r9STOXMaSrRZfYs5CQidiA95ZAGa6Ww004B07U6nk'

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf'
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
 
  mongo = await MongoMemoryServer.create()
  const mongoUri = await mongo.getUri()
  await mongoose.connect(mongoUri)
})
 
beforeEach(async () => {
  jest.clearAllMocks()

  const collections = await mongoose.connection.db.collections()
 
  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

global.signup = (id?: string) => {
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com'
  }

  const token = jwt.sign(payload, process.env.JWT_KEY!)
  const session = { jwt: token }
  const sessionJSON = JSON.stringify(session)
  const base64 = Buffer.from(sessionJSON).toString('base64')

  return [`express:sess=${base64}`]
}