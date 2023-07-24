import {Get, Query, Route} from "tsoa";
import {Message} from "../models/Message";
const Models = require('../../models');
const message = Models.Messages;

@Route("messages")
export default class MessageController {


    @Get("/")
    public async getMessagesByUserId(@Query() id): Promise<Message[]>{
        const messages = await message.findAll({
            where:{
                from: id
            }
        });

       if(messages){
           return messages;
       }

       return undefined;
    }


}