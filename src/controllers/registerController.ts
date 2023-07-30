import { Post, Route, Request} from "tsoa";
import {Request as ExpressRequest} from "express";
const Models = require('../../models');
const User = Models.User;
const fs = require ("fs"); 

@Route("register")
export default class RegisterController {

    @Post("/")
    public async register(@Request() req:ExpressRequest): Promise<any>{
        let user = { ...req.body,  'avatar' : fs.readFileSync(__dirname+'\\..\\..\\Images\\' + req.file.filename) }
        const userDB = await User.build(user).save();

        if(userDB)
        {
            return {'register':'success'};
        }
        

        return undefined;
    }
    
}