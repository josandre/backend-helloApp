
export class Message{
    from: number;
    to: number;
    message: string;

    constructor(partial?: Partial<Message>) {
        if(partial){
            Object.assign(this, partial);
        }
    }
}