import UserController from '../../controller/userController'


export default async (router) => {
  router.get('/user',UserController.setUser)
}
