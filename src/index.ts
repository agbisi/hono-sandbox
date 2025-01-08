import { Hono } from 'hono'
import { Client } from 'pg'

const app = new Hono()

app.get('/', async (c) => {
  let svDate = new Date().toISOString()
  let apiKey = c.env.COCKROACH_CONN_STR

  const db = new Client({connectionString: apiKey})

  try {
    let rows = await db.query('select current_timestamp tstamp').rows
    let dbDate = rows[0].tstamp.toISOString()

    await db.end()
    return c.json({
      svDate,
      dbDate
    })
  } catch (err) {
    console.log(err)
    return c.text('Unknown error!')
  }

   })

export default app
