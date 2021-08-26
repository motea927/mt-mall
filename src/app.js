const express = require('express')

require('./db/mongoose')

const adminRoutes = require('./routes/admin/adminRoutes')
const webRoutes = require('./routes/web/webRoutes')
const history = require('connect-history-api-fallback')

const app = express()
const port = process.env.PORT

const cors = require('cors')
if (process.env.mode === 'dev') {
  app.use(cors())
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 後臺 API
app.use('/admin', adminRoutes)

// APP API
app.use('/web', webRoutes)

const imageControllers = require('./controllers/imageControllers')
app.use('/uploads/:fileName', imageControllers.getImage)

if (process.env.NODE_ENV === 'production') {
  app.use('/admin-client', express.static('vue-admin-template-client/dist'))
  app.use(history())
  app.use(express.static('web-client/dist'))
}

if (process.env.mode !== 'test') {
  app.listen(port, () => console.log(`express listen on ${port}`))
}

module.exports = app
