import {Get, Post, Query, Route} from "tsoa";
import jwt from "jsonwebtoken";
import config from "../../config";
import {LogInResponse} from "../models/LogInResponse";
const Models = require('../../models');
const User = Models.User;

@Route("login")
export default class UserController {


    @Get("/")
    public async login(@Query() email, @Query() password): Promise<LogInResponse>{
        const user = await User.findOne({where: {email: email, password: password}});

        if(user)
        {
           const token = jwt.sign({"id": user.idUser, "firstName": user.firstName, "secondName": user.secondName, "nickName": user.nickName, "email": user.email}, config.TOKENKEY,
               {
                   expiresIn: "24h"
               }
               );
           return new LogInResponse({
               token, avatar: Buffer.from(user.avatar).toString('base64')
           })
        }

        return undefined;
    }
}