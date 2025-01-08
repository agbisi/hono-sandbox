import { Hono } from 'hono'
import { Client } from 'pg'

const app = new Hono()

app.get('/', async (c) => {
  console.log('running')
  let svDate = new Date().toISOString()
  let apiKey = c.env.COCKROACH_CONN_STR

  const db = new Client({
    connectionString: apiKey,
    statement_tomeout: 30000,
    connectionTimeoutMillis: 30000,
    lock_timeout: 30000,
    query_timeout_30000,
  })

  try {
    await db.connect()
    let rows = (await db.query("select Now() tstamp")).rows
    let dbDate = rows[0].tstamp.toISOString()

    await db.end()
    return c.json({
      svDate,
      // dbDate
    })
  } catch (err) {
    console.log(err)
    return c.text(`errr! ${err.message}`)
  }

   })

export default app
