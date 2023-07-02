export class UserRequest{
    name: string
    lastName: string
    nickName: string
    email: string
    password: string

    constructor(partial?: Partial<UserRequest>) {
        if(partial){
            Object.assign(this, partial);
        }
    }
}