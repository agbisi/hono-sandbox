import { Hono } from 'hono'
import { Client } from 'pg'

const app = new Hono()

app.get('/', async (c) => {

  const startTime = (new Date()).toISOString()
  const connstr = c.env.COCKROACH_CONN_STR
  const db = new Client({connectionString:  connstr })
  await db.connect()
  dbTime = (await db.query('select current_timestamp tstamp')).rows[0].tstamp.toISOString()

  return c.json({
    startTime,
    dbTime,
    message: 'Hello Hono',
    endTime: (new Date()).toISOString(),
  })
})

export default app
