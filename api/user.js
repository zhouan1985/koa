import koaRouter from 'koa-router'
import user from '../controller/user'
const router = new koaRouter()

router.post('/user/add', user.add)
router.get('/user/findById/:id', user.findUserById)
router.post('/user/list', user.list)
export default router