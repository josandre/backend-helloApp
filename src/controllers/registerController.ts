import {Body, Get, Post, Query, Route} from "tsoa";
import {UserRequest} from "../models/UserRequest";
const Models = require('../../models');
const User = Models.User;

@Route("register")
export default class RegisterController {

    @Post("/")
    public async register(@Body()req:UserRequest): Promise<any>{
        const user = await User.build({...req, firstName: req.name}).save();

        if(user)
        {
            return user;
        }

        return undefined;
    }


    
}