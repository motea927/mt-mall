const express = require('express')
require('./db/mongoose')

const adminRoutes = require('./routes/admin/adminRoutes')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/admin', adminRoutes)

if (process.env.mode !== 'test') {
  app.listen(port, () => console.log(`express listen on ${port}`))
}

module.exports = app
