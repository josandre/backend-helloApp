export class User {
    name: string
    lastName: string
    nickName: string
    email: string
    password: string
    avatar: string

    constructor(partial?: Partial<User>) {
        if(partial){
            Object.assign(this, partial);
        }
    }
}