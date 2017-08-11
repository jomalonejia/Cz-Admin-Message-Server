import mongoose from 'mongoose'

const Schema = mongoose.Schema
const thread = new Schema({
    users:[{type:String}],
    unRead:String,
    messages:[{
      username: String,
      text: String,
      profile:String,
      sentTime: Date,
      isSentSuccess: Boolean
    }]

})

module.exports = mongoose.model('Thread', thread)