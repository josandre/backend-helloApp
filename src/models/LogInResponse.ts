export class LogInResponse{
    token: string; 
    avatar: string

    constructor(partial?: Partial<LogInResponse>) {
        if(partial){
            Object.assign(this, partial);
        }
    }
}