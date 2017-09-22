
let config = {
  app:{
    port:3000
  },
  mongo:{
    url: 'mongodb://localhost:27017/czAdminMessage'
  },
  redis:{
    port:6379,
    host:'127.0.0.1'
  }
}

export default config;