import { Hono } from 'hono'
import { Client } from 'pg'

const app = new Hono()

app.get('/', async (c) => {
  let apiKey = c.env.COCKROACH_CONN_STR
  let sum = await (3 + 7)
  return c.json({
    message: 'Hello Hono',
    sum,
    ky: apiKey.slice(0, 5)
  })
   })

export default app
