// server/utils/db.ts
import { MongoClient, Db } from 'mongodb'

const uri = useRuntimeConfig().mongoUri
const dbName = useRuntimeConfig().mongoDbName

let client: MongoClient | null = null
let db: Db | null = null

export async function getDB(): Promise<Db> {
  if (db) return db

  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
  }

  db = client.db(dbName)
  return db
}