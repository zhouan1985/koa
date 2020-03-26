import USER from '../model/USER'
import constant from '../tool/constant'
import {result,encrypt,decryption} from '../tool/tool'

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
export default {
    login:login
}