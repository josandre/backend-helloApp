export class UserData{
    userId: string
    email: string

    constructor(partial?: Partial<UserData>) {
        Object.assign(this, partial)
    }
}