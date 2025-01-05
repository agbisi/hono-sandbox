import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({
    message: 'Hello Hono',
    date: (new Date()).toISOString(),
  })
})

export default app
