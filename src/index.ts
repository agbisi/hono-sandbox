import { Hono } from 'hono'
import { Client } from 'pg'

const app = new Hono()

app.get('/',  async (c) => {
  return c.text(`db-pwd: ${c.env.COCKROACH_CONN_STR}`)
   })

export default app
