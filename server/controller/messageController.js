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
    let username = ctx.query.username
    await Thread.find({
       /* 'messages':{$elemMatch:{'isRead':false,'username':{$ne:username}}},
        'users':{$in:[username]}*/
        unRead:username
      }
    ,{'messages':{$slice:-1}})
     .then(res => ctx.body=res)
  }

  async readMessage(ctx){
    let threadId = ctx.request.body.params.messageId
    await Thread.findOneAndUpdate(
        {_id:threadId},
        {unRead:''}
      ).then(obj => {
        ctx.body = obj.messages
      })
        .catch(err => console.log(err))

   /* Thread.find({_id:threadId,'messages.isRead':false})
      .then(res => {
        res[0].messages.map(message => {
          message.isRead = true
        })
        return res[0]
      })
      .then(newRes => {
        console.log(newRes._id)
        console.log(newRes.messages)
        Thread.update(
          {_id:newRes._id},
          {$push:{messages:newRes.messages[0]}}
        )
      })*/
    /*await  Thread.update(
      {'_id':'598d0c8b278e0a2b4c0ea522'},
      {$set: {'messages.$[i].isRead':true }},
      {upsert:true},
      (err) => {
        console.log(err);
      });*/
  }
}
export default new MessageController()