import User from '../model/user'

class UserController {
  async  setUser (ctx) {
    let user = new User({username:'xiaoming'})
    await user.save((err,res) => {
      if (err) {
        console.log("Error:" + err);
      }
      else {
        console.log("Res:" + res);
      }
    })
    ctx.body='success'
  }
}

export default new UserController()