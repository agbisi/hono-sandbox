import { Hono } from 'hono'
import { Client } from 'pg'

const app = new Hono()

app.get('/',   (c) => {
  return c.json({
    message: 'Hello Hono'
  })
   })

export default app
