import {Get,  Query,  Route} from "tsoa";
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
           const token = jwt.sign({"id": user.id, "firstName": user.firstName, "lastName": user.lastName, "nickName": user.nickName, "email": user.email}, config.TOKENKEY,
               {
                   expiresIn: "24h"}
               );

            let avatarBase64 = user.avatar ? Buffer.from(user.avatar).toString('base64') : undefined;
            avatarBase64 = avatarBase64?.replace("dataimage/jpegbase64", "")

           return new LogInResponse({
               token,
               avatar: user.avatar ? avatarBase64 : undefined
           })
        }

        return undefined;
    }


}