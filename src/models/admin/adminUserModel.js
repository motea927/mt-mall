const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const adminUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    account: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true
    },
    token: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
)

adminUserSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password

  return userObject
}

adminUserSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

  user.token = token
  await user.save()

  return token
}

adminUserSchema.statics.findByCredentials = async (account, password) => {
  const user = await User.findOne({ account })

  if (!user) throw new Error('帳號或密碼錯誤')

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) throw new Error('帳號或密碼錯誤')
  return user
}

// hash password
adminUserSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model('AdminUser', adminUserSchema)

module.exports = User
