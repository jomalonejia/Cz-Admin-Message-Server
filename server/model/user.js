
import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const user = new Schema({
  username:String
})

module.exports = mongoose.model('user',user)