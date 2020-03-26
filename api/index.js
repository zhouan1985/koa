import router from 'koa-router'
import indexController from '../controller/index'
const index = new router()

index.post('/login', indexController.login)

export default index