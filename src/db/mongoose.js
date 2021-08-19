const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('DB連接成功')
  createAdmin()
})

const AdminModel = require('../models/admin/adminSuperUserModel')
async function createAdmin() {
  const adminUserCounts = await AdminModel.countDocuments({})
  if (adminUserCounts > 0) return
  const firstAdmin = new AdminModel({
    name: 'Admin',
    account: 'admin',
    password: 'admin123'
  })
  await firstAdmin.save()
}
