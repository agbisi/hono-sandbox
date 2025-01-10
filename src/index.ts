import { Hono } from 'hono'
import { Client } from 'pg'

const app = new Hono()

async function run(env){
  const serverTime = new Date().toISOString()

  const db = new Client({
    connectionString: env.COCKROACH_CONN_STR,
    ssl: {
      rejectUnauthorized: false,
      ca: env.CERT,
    }
  })

  await db.connect()
  console.log('connected')
  let row = (await db.query('SELECT NOW() tstamp')).rows[0]
  const dbTime = row.tstamp.toString()
  await db.end()
  console.log('closed')

  return {
    serverTime,
    dbTime,
  }


}

app.get('/', async (c) => {
  console.log('running...')
  let r = await run(c.env)
  return c.json(r)
   })

export default app
