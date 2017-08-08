import MessageController from '../../controller/messageController'


export default async (router) => {
  router.get('/listMessagesById/:threadId',MessageController.listMessagesById)
  router.get('/listMessages/',MessageController.listMessages)
}
