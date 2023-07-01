
export class LogInResponse{
    token: string

    constructor(partial?: Partial<LogInResponse>) {
        if(partial){
            Object.assign(this, partial);
        }
    }
}