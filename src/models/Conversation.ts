import {Message} from "./Message";

export class Conversation {
    id: number
    to: number
    from: number
    date: Date
    messages: Array<Message>[]
    name: string
    photo: string

    constructor(partial?: Partial<Conversation>) {
        if(partial){
            Object.assign(this, partial);
        }
    }
}