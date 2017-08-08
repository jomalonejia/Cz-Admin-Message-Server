import mongoose from 'mongoose'

const Schema = mongoose.Schema
const thread = new Schema({
    users:[{type:String}],
    messages:[{
      username: String,
      text: String,
      sentTime: Date,
      isRead: Boolean,
      isSentSuccess: Boolean
    }]

})

module.exports = mongoose.model('Thread', thread)