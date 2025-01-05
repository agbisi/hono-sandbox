import { Hono } from 'hono'
import { Client } from 'pg'

const app = new Hono()

app.get('/',  (c) => {
  return c.text(`pwd: ${c.env.COCKROACH_CONN_STR}`)
   })

export default app
