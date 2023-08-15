import {Get, Query, Route} from "tsoa";
import {Op} from 'sequelize'
import {Conversation} from "../models/Conversation";
const Models = require('../../models');
const message = Models.Message;
const user = Models.User;
const conversation = Models.Conversation;

@Route("conversations")
export default class ConversationController {

    @Get("/")
    public async getConversationsByUserId(@Query() id: number): Promise<Conversation[]>{
        const conversations = await conversation.findAll({
            include: message,
            where:{
                [Op.or]: [
                    {from: id},
                    {to: id}
                ]
            }
        });

       if(conversations) {
           return await Promise.all(conversations.map(async (conversation) => {
               const recipient = conversation.to == id ? conversation.from : conversation.to
               const userTo = await user.findByPk(recipient);

               let avatarBase64 = userTo.avatar ? Buffer.from(userTo.avatar).toString('base64') : undefined;
               avatarBase64 = avatarBase64?.replace("dataimage/jpegbase64", "")

               return new Conversation({
                   name: userTo.nickName,
                   id: conversation.id,
                   to: conversation.to,
                   from: conversation.from,
                   photo:avatarBase64,
                   messages: conversation.Messages
               })
           }));
       }
       return undefined;
    }


}