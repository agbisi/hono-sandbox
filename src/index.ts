import { Hono } from 'hono'
import { Client } from 'pg'

const app = new Hono()

app.get('/',  async (c) => {
  const startTime = (new Date()).toISOString()
  console.log(startTome)
  const db = new Client({connectionString: c.env.COCKROACH_CONN_STR})
  await db.connect()
  let row = (await db.query('select current_timestamp tstamp')).rows[0]
  const dbTime = row.tstamp.toISOString()

  await db.end()
  return c.json({startTime,
                dbTime,
                endTime: (new Date()).toISOString()
  })
   })

export default app
