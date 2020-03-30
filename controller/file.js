import Sequelize from 'Sequelize'
import File from '../model/File'
import constant from '../tool/constant'
import {result} from '../tool/tool'

const add = async ctx =>{
    const params = ctx.request.body
    await USER.create(params).then(res=>{
        result(ctx,codeSuccess,msgSuccess)
      })
}