
export class Message{
    from: number;
    to: number;
    message: string;
    idConversation: number;
    date: Date;

    constructor(partial?: Partial<Message>) {
        if(partial){
            Object.assign(this, partial);
        }
    }
}