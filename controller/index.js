import fs from 'fs'
import USER from '../model/USER'
import File from '../model/File'
import send from 'koa-send'
import constant from '../tool/constant'
import {result,encrypt,decryption,createPic} from '../tool/tool'
import config from '../config'

const codeSuccess = constant.code.success
const codeError = constant.code.error
const msgSuccess = constant.msg.success

const login = async (ctx) =>{
    const params = ctx.request.body
    if(!(params && params.name && params.password)){
        result(ctx,codeError,'用户名或密码不能为空')
        return
    }
    try{
        const data = await USER.findOne({ //返回的一个实例对象
            where: {
              name: params.name
            }
          })
        //验证密码是否一致
        if(data){
            if(decryption(params.password, data.get('password'))){
                result(ctx,codeSuccess,msgSuccess)
            }else{
                result(ctx,codeSuccess,'用户名或密码错误')
            }  
        }else{
            result(ctx,codeSuccess,'用户名或密码错误')  
        }
       }catch(err){
        const msg = err.errors[0]
        result(ctx,codeError,msg)
       }
}
// 文件上传
const upload = async ctx =>{
       // 上传单个文件
    const file = ctx.request.files.file // 获取上传文件
    if(file.name){
        const fileName = createPic() // 设置新的文件名 按当前时间 
        const fileSuffix =file.name.substr(file.name.lastIndexOf('.'),file.name.length) 
        console.log(file)
        // 创建可读流
        const reader = fs.createReadStream(file.path);
     //    let filePath = path.join(__dirname, 'public/upload/') + `/${file.name}`
     //    let filePath = config.uploadFile + `${file.name}`
        let filePath = config.uploadFile + fileName + fileSuffix
        // 创建可写流
        const upStream = fs.createWriteStream(filePath)
        // 可读流通过管道写入可写流
        reader.pipe(upStream)
        await File.create({fileName:fileName + fileSuffix}).then(res=>{
            result(ctx,codeSuccess,msgSuccess)
          })
       
    }else{
        result(ctx,codeSuccess,'文件不能为空')
    }
}
// 文件下载
const download = async ctx =>{
    const params = ctx.params
    if(!params.id){
        result(ctx,codeError,'id不能为空')
        return
      } 
      await File.findOne({
          where:{
              id:params.id
          }
      }).then(res=>{
        const fileName = res.fileName;
        const path =config.uploadFile + fileName;
        // ctx.attachment(path);
        console.log(fileName)
        send(ctx, fileName,{ root: config.uploadFile});
      })
}
export default {
    login:login,
    upload:upload,
    download:download
}