import { Hono } from 'hono'
import { Client } from 'pg'

const app = new Hono()

app.get('/', async (c) => {
  const serverTime = new Date().toISOString()

  const db = new Client({
    connectionString: c.env.COCKROACH_CONN_STR,
    ssl: {
      rejectUnauthorized: false,
      ca: c.env.CERT,
    }
  })

  await db.connect()
  let row = (await db.query('SELECT NOW() tstamp')).rows[0]
  const dbTime = row.tstamp.toString()
  await db.end()

  return c.json({
    serverTime,
    dbTime,
  })

   })

export default app
