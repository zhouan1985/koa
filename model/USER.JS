import Sequelize from 'sequelize'
import sequelize from '../db/sequelize'
const user = sequelize.define('user', { 
    id: {
      type: Sequelize.INTEGER(11), // 设置字段类型
      primaryKey: true, // 设置为主建
      autoIncrement: true, // 自增
      unique: true 
      },
    name: {
      type: Sequelize.STRING,
      unique: { // 唯一
        msg: '用户名已存在'
      },
      validate:{
        isEven(val){
          if(!val){
            throw new Error('用户名不能为空')
          }
        }
      }
    },
    password:{
        type: Sequelize.STRING,
        // 自定义验证
        validate:{
          isEven(val){
            if(!val){
              throw new Error('密码不能为空')
            }
          }
        }
    }
  },
  {
    // sequelize会自动使用传入的模型名（define的第一个参数）的复数做为表名 设置true取消默认设置
    // freezeTableName: false,
      // 是否需要增加createdAt、updatedAt、deletedAt字段
      // 'timestamps': true,
      // // 不需要createdAt字段
      // 'createdAt':'createTime',
      // // 将updatedAt字段改个名
      // 'updatedAt':'updateTime'
  })
  sequelize.sync()
  export default user