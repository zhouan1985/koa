import koa from 'koa'
import bodyparse from 'koa-bodyparser'
import index from './api/index'
import user from './api/user'

const app = new koa()
app.use(bodyparse())
app.use(index.routes())
app.use(user.routes())

app.listen(3000,()=>{
    console.log('server start')
})