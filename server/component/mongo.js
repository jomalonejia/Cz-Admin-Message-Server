import mongoose from 'mongoose'
import config from '../configs/config'

mongoose.connect(config.mongo.url)

let db = mongoose.connection

db.on('error',(err)=>[
  console.error('connect error:' + err)
])

db.once('open',()=>{
  console.log('MongoDB is ready')
})

export {db}