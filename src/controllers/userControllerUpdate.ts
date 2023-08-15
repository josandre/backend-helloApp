import { Put, Route, Body, Request} from "tsoa";
import {Request as ExpressRequest} from "express";
import {User} from "../models/User";
const Models = require('../../models');
const UserModel = Models.User;
const fs = require ("fs");
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken"
import config from "../../config";
import {LogInResponse} from "../models/LogInResponse";
import { UserData } from "../middleware/UserData";

@Route("users")
export default class UpdateUserController {

    @Put("/")
    public async updateUser(@Body() newUser: User, @Request() req:ExpressRequest): Promise<any>{
      

        const blobAvatar = newUser.avatar ? Buffer.from(newUser.avatar,"base64") : undefined;
        console.log(blobAvatar); 
        const userData = jwt.verify(req.get("x-token"), config.TOKENKEY) as JwtPayload;
        await UserModel.update({
            firstName: newUser.name,
            lastName: newUser.lastName,
            nickName: newUser.nickName,
            avatar : blobAvatar
        }, {where:{id:userData.id}})
     
        const user = await UserModel.findOne({where: {id: userData.id}});

        if(user) {
            const token = jwt.sign({"id": user.id, "firstName": user.firstName, "lastName": user.lastName, "nickName": user.nickName, "email": user.email}, config.TOKENKEY,
               {
                   expiresIn: "24h"
               }
               );
           return new LogInResponse({
               token,
               avatar: user.avatar ? Buffer.from(user.avatar).toString('base64').replace("dataimage/jpegbase64", "") : undefined
           })
        }
       
        return undefined;
    }
}