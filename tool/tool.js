import bcrypt from 'bcryptjs'
// 设置响应body值
export function result(ctx,code,data){
   ctx.body = {
       code:code,
       data:data
   }
}
// 加密字符串
export  function encrypt(str){
    return bcrypt.hashSync(str,  bcrypt.genSaltSync(10))
}
// 验证加密后的字符串是否一样
export function decryption(str1,str2){
    return bcrypt.compareSync(str1, str2); 
}