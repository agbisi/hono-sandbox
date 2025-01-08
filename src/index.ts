import { Hono } from 'hono'
import { Client } from 'pg'

const app = new Hono()

app.get('/', async (c) => {
  let sum = await (3 + 7)
  return c.json({
    message: 'Hello Hono',
    sum
  })
   })

export default app
