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

//根据当前时间产生名称
export function createPic(){
    var now=new Date(); 
     var year = now.getFullYear(); //得到年份
     var month = now.getMonth();//得到月份
     var date = now.getDate();//得到日期
     var hour = now.getHours();//得到小时
     var minu = now.getMinutes();//得到分钟
     month = month + 1;
     if (month < 10) month = "0" + month;
     if (date < 10) date = "0" + date;
   var number = now.getSeconds()%43; //这将产生一个基于目前时间的0到42的整数。
   var time = year + month + date+hour+minu;
   return time+"_"+number;
}
