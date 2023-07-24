import { Post, Route, Request} from "tsoa";
import {Request as ExpressRequest} from "express";
import {UserRequest} from "../models/UserRequest";


const Models = require('../../models');
const User = Models.User;
const fs = require ("fs"); 


@Route("register")
export default class RegisterController {

    @Post("/")
    public async register(@Request() req:ExpressRequest): Promise<UserRequest>{

        let user = { ...req.body,  'avatar' : fs.readFileSync(__dirname+'\\..\\..\\Images\\' + req.file.filename) }

        const userDB = await User.build(user).save();


        if(userDB)
        {
            return userDB;
        }
        

        return undefined;
    }


    
}