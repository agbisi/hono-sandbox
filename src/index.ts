import { Hono } from 'hono'
import { Client } from 'pg'

const app = new Hono()

app.get('/',  (c) => {

  const startTime = (new Date()).toISOString()
  const connstr = c.env.COCKROACH_CONN_STR
  const db = new Client({connectionString:  connstr })
  let r = db.connect()
    .then(()=> ( db.query('select current_timestamp tstamp')).rows[0].tstamp.toISOString())
      .then( (dbTime)=> c.json({
    startTime,
    dbTime,
    message: 'Hello Hono',
    endTime: (new Date()).toISOString(),
  }))

  return r

   })

export default app
