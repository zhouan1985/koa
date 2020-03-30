import koa from 'koa'
// import bodyparse from 'koa-bodyparser'
import path from 'path'
import bodyparse from 'koa-body'
import index from './api/index'
import user from './api/user'

const app = new koa()
app.use(bodyparse({
    multipart:true, // 支持文件上传
    // encoding:'gzip',
    formidable:{
    //   uploadDir:path.join(__dirname,'public/upload/'), // 设置文件上传目录
    //   uploadDir:path.resolve('D:/koa-upload/'), // 设置文件上传目录
      keepExtensions: true,    // 保持文件的后缀
      maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
      onFileBegin:(name,file) => { // 文件上传前的设置
        // console.log(`name: ${name}`);
        // console.log(`file: ${file}`);
        // console.log(file);
      }
    }
}))
app.use(index.routes())
app.use(user.routes())

app.listen(3000,()=>{
    console.log('server start')
})