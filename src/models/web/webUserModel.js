const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const webUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid')
        }
      }
    },
    password: { type: String, required: true, trim: true, minlength: 6 },
    token: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
)

webUserSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password

  return userObject
}

webUserSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

  user.token = token
  await user.save()

  return token
}

webUserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) throw new Error('帳號或密碼錯誤')

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) throw new Error('帳號或密碼錯誤')
  return user
}

// hash password
webUserSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

webUserSchema.virtual('order', {
  ref: 'WebOrder',
  localField: '_id',
  foreignField: 'userId'
})
const User = mongoose.model('WebUser', webUserSchema)

module.exports = User
