import Thread from '../model/Thread'

class MessageController {
  async  listMessagesById (ctx) {
    await Thread.findById(ctx.params.threadId,(err,res) => {
      if (err) {
        ctx.body = err;
      }
      else {
        console.log(res);
        ctx.body = res;
      }
    })
  }

  async listMessages(ctx, next){
    let thread = Thread
    await thread.find({users:{ $in: [ctx.query[0], ctx.query[1]] }},
      function(err, res){
        if(err){
          ctx.body = err
        }else{
            if(res != null && res !=''){
              ctx.body = res[0]._id
            }else{
              console.log('not has res....')
              const newThread =  new Thread(
                {users: [ctx.query[0],ctx.query[1]]},
                {messages:[]})

              newThread.save(err => {
                if (err) {
                  ctx.body = err
                } else {
                  console.log(newThread._id)
                  ctx.body = newThread._id
                }
              })
            }
        }
      })
  }
}
export default new MessageController()