import { Hono } from 'hono'
import { Client } from 'pg'

const app = new Hono()

app.get('/', async (c) => {
  let svDate = new Date().toISOString()
  let apiKey = c.env.COCKROACH_CONN_STR

  const db = new Client({connectionString: apiKey})

  try {
    let roes = await db.query('select cuurent_timestamp tstamp')
    let dbDate = rows[0].tstamp.toISOString()
    return c.json({
      svDate,
      dbDate
    })
  } catch (err) {
    console.log(err)
    return c.text('Unknown error!')
  }

  return c.json({
    message: 'Hello Hono',
    ky: apiKey.slice(0, 5)
  })
   })

export default app
