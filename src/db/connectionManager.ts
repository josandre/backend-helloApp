import config from "../../config";

const {Sequelize} = require('sequelize');


export const sequelize = new Sequelize(config.BNAME, config.BUSER, config.BPASSWORD, {
    host: config.BHOST,
    dialect: config.BDIALECT
})

export const connectionTest = async () => {
    try {
        await sequelize.authenticate();
        console.log("connection succesfull")
    } catch (error) {
        console.error("the connection failed", error)
    }
}