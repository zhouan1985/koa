import router from 'koa-router'
import indexController from '../controller/index'
const index = new router()

index.post('/login', indexController.login)
index.post('/upload', indexController.upload)
index.get('/download/:id', indexController.download)

export default index