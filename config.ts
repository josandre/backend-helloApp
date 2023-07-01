import path from "path";
import dotenv from 'dotenv';

dotenv.config({path: path.resolve(__dirname, "config.env")})

interface ENV {
    BNAME: string,
    BUSER: string,
    BPASSWORD: string,
    BHOST: string,
    BDIALECT: 'mysql',
    TOKENKEY: string
}

interface Config {
    BNAME: string,
    BUSER: string,
    BPASSWORD: string,
    BHOST: string,
    BDIALECT: 'mysql',
    TOKENKEY: string

}

const getConfig = (): ENV => {
    return {
        BNAME: process.env.BNAME,
        BUSER: process.env.BUSER,
        BDIALECT: process.env.BDIALECT as 'mysql',
        BHOST: process.env.BHOST,
        BPASSWORD: process.env.BPASSWORD,
        TOKENKEY: process.env.TOKENKEY

    }
}

const getSanitzedConfig = (config: ENV): Config => {
    for(const [key, value] of Object.entries(config)){
        if(value === undefined){
            throw new Error(`missing key ${key} in config.env`)
        }
    }
    return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);
export default sanitizedConfig;