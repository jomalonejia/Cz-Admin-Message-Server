import redis from 'redis'

import config from '../configs/config'

let client = redis.createClient(config.redis.port,config.redis.host);

client.on('error', function(err) {
  console.error('Redis Error ' + err)
})

client.on('connect', function() {
  console.log('Redis is ready')
})

export default client;