import config from "../../config";

const {Sequelize} = require('sequelize');

export const sequelize = new Sequelize(config.BNAME, config.BUSER, config.BPASSWORD, {
    host: config.BHOST,
    dialect: config.BDIALECT
})
