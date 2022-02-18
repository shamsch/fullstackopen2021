const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide username'],
    minLength: [3, 'Username is too short, must be longer than 3 characters'],
    unique: true
  },
  name: String,
  passwordHash: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [3, 'Password is too short, must be longer than 3 characters']
  }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)