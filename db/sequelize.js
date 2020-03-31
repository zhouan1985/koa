import Sequelize from 'sequelize'
import config from '../config'

const sequelize = new Sequelize(
    config.MYSQL_CONFIG.database,
    config.MYSQL_CONFIG.username,
    config.MYSQL_CONFIG.password, {
        host: config.MYSQL_CONFIG.host,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 30000
        },
        timezone: "+08:00",
        define: {
            timestamps: true,
            createdAt: "createTime", //自定义时间戳
            updatedAt: "updatedTime", // 自定义时间戳
        },
    })
sequelize.authenticate().then(() => {
    console.log('MYSQL 连接成功......');
}).catch(err => {
    console.error('链接失败:', err);
});
// 根据模型自动创建表
sequelize.sync()

export default sequelize