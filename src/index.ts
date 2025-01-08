import { Hono } from 'hono'
import { Client } from 'pg'

const app = new Hono()

app.get('/', async (c) => {
  let svDate = new Date().toISOString()
  let apiKey = c.env.COCKROACH_CONN_STR

  const db = new Client({connectionString: apiKey})

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
    return c.text(err.message)
  }

   })

export default app
