import Sequelize from 'Sequelize'
import USER from '../model/USER'
import constant from '../tool/constant'
import {result,encrypt,decryption} from '../tool/tool'
var Op = Sequelize.Op;

const codeSuccess = constant.code.success
const codeError = constant.code.error
const msgSuccess = constant.msg.success


// 查询所有
const listAll = async (ctx) => {
   try{
    const data = await USER.findAll().then(res=>{
      result(ctx,codeSuccess,res)
    })
   }catch(err){
    const msg = err.errors[0]
    result(ctx,codeError,msg)
   }
  }
// 分页查询搜索
const list = async ctx =>{
  try{
    const params = ctx.request.body
    const limit = params.limit ? Number(params.limit) : 10
    const offset = params.offset ? Number(params.offset) : 0
    const search = params.search ? params.search : ''
    await USER.findAll({
      limit: limit,
      offset: (offset - 1) * limit,
      order: [
        ['id', 'DESC'],
       ],
      where: {
        name:{
          [Op.like]: `%${search}%`
        }
      }
    }).then(res=>{
      result(ctx,codeSuccess,res)
    })
   }catch(err){
    const msg = err.errors[0]
    result(ctx,codeError,msg)
   }
}

// 通过id 查询
const findUserById = async ctx =>{
  const params = ctx.params
  if(!params.id){
    result(ctx,codeError,'用户id不能为空')
    return
  }
  try{
    // const data = await USER.findById(1,{})
    await USER.findOne({
      where:{
        id:params.id
      }
    }).then(res=>{
      result(ctx,codeSuccess,res)
    })
  }catch(err){
    const msg = err.errors[0]
    result(ctx,codeError,msg)
  }
}
// 创建用户
  const add = async (ctx) => {
    const params = ctx.request.body
    try {
      if(params.password){
        params.password = encrypt(params.password)
      }
      await USER.create(params).then(res=>{
        result(ctx,codeSuccess,msgSuccess)
      })
    }
    catch(err) {
      const msg = err.errors[0]
      result(ctx,codeError,msg.message)
    }
  }
  // 修改用户
  const updateUser = async ctx =>{
    const params = ctx.request.body
    if(!params.id){
      result(ctx,codeError,'id不能为空')
      return
    }

  }
  export default {
    listAll:listAll,
    list:list,
    add:add,
    findUserById:findUserById,
  }