export class User {
    id: number;
    username: string;
    password?: string;
    name ?: string;
    email : string
    constructor(id : number,username : string,email : string,password?: string,name?: string){
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.name = name;
    }
}