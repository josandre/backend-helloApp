import { Put, Route, Request} from "tsoa";
import {Request as ExpressRequest} from "express";
const Models = require('../../models');
const User = Models.User;
const fs = require ("fs");
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken"
import config from "../../config";
import {LogInResponse} from "../models/LogInResponse";
import { UserData } from "../middleware/UserData";

@Route("users")
export default class UpdateUserController {

    @Put("/")
    public async updateUser(@Request() req:ExpressRequest): Promise<any>{

        const userData = jwt.verify(req.get("x-token"), config.TOKENKEY) as JwtPayload;
        await User.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nickName: req.body.nickName,
            avatar : fs.readFileSync(__dirname+'\\..\\..\\Images\\' + req.file.filename)
        }, {where:{id:userData.id}})
     
        const user = await User.findOne({where: {id: userData.id}});

        if(user) {
            const token = jwt.sign({"id": user.id, "firstName": user.firstName, "lastName": user.lastName, "nickName": user.nickName, "email": user.email}, config.TOKENKEY,
               {
                   expiresIn: "24h"
               }
               );
           return new LogInResponse({
               token,
               avatar: user.avatar ? Buffer.from(user.avatar).toString('base64') : undefined
           })
        }
       
        return undefined;
    }
}