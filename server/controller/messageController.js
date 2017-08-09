import Thread from '../model/Thread'

class MessageController {
  async  listMessagesById (ctx) {
    await Thread.findById(ctx.params.threadId)
      .then(res => ctx.body=res)
      .catch(err => ctx.body=err)
  }

  async listMessages(ctx){
      let promise =
        await Thread.find({ $or: [{users:[ctx.query[0], ctx.query[1]]},{users:[ctx.query[1], ctx.query[0]]}] })
          .then(res => {
            if(res !=null && res !=''){
              return new Promise(resolve => {
                resolve(res)
              })
            }else{
              const newThread =  new Thread(
                {users: [ctx.query[0],ctx.query[1]]},
                {messages:[]})
              return newThread.save()
            }
          })
          .then(res => {
            ctx.body = res
          })
          .catch(err => console.log(err))
  }

  async listMessagesTodo(ctx){
    await Thread.find({'messages':{$elemMatch:{'isRead':false}}},{'messages':{$slice:-1}})
     .then(res => ctx.body=res)
  }
}
export default new MessageController()