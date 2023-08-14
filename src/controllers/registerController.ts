import {Post, Route, Body} from "tsoa";
import {User} from "../models/User";
const Models = require('../../models');
const UserModel = Models.User;

@Route("register")
export default class RegisterController {

    @Post("/")
    public async register(@Body() newUser: User): Promise<User>{
        console.log(newUser, "User")
        const blobAvatar = newUser.avatar ? Buffer.from(newUser.avatar,"base64") : undefined;
        let user = { ...newUser, avatar: blobAvatar}
        const userDB = await UserModel.build(user).save();

        if(userDB)
        {
            return userDB;
        }
        return undefined;
    }

}