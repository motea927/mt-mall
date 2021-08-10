const express = require('express')
require('./db/mongoose')

const adminRoutes = require('./routes/admin/adminRoutes')
const webRoutes = require('./routes/web/webRoutes')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 後臺 API
app.use('/admin', adminRoutes)

// APP API
app.use('/web', webRoutes)

if (process.env.mode !== 'test') {
  app.listen(port, () => console.log(`express listen on ${port}`))
}

module.exports = app
