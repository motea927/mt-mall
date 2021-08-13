const express = require('express')
const path = require('path')
const fs = require('fs')

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

app.use('/uploads/:fileName', (req, res, next) => {
  const fileName = req.params.fileName
  const filePath = path.join(__dirname, `./uploads/${fileName}`)

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(404).send()
      return
    }
    res.set('Content-Type', 'image/png')
    res.send(data)
  })
})

if (process.env.mode !== 'test') {
  app.listen(port, () => console.log(`express listen on ${port}`))
}

module.exports = app
