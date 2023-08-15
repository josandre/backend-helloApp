import {Body, Post, Route} from "tsoa";
import {Message} from "../models/Message";
import {ConversationSocket} from "../webSocket/ConversationSocket";
const Models = require('../../models');
const MessageModel =  Models.Message;


@Route("message")
export default class MessageController {

    @Post("/")
    public async createMessage(@Body() req:Message): Promise<Message>{
        const message = await MessageModel.build({...req, content: req.message, date: new Date()}).save();

        if(message)
        {
            ConversationSocket.getInstance().emitMessage(message.dataValues);
            return message.dataValues;
        }

        return undefined;
    }

}