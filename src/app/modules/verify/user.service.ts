import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { User } from './user';
 
@Injectable()
export class UserService {
    users : User [] = [];
    constructor() { } 
    getAllUser(){
        return this.users;
    }
    createUser(user : User) : boolean{
        let check : boolean = true;
        this.users.forEach(e=>{
            if(e.username == user.username || e.email == user.email){
                check = false;
            }
        })
        if(check) this.users.push(user);
        return check;
    }
    checkUserLogin (username : string,password : string) : boolean{
        let data : boolean = false;
        this.users.forEach(element => {
            if(element.username == username && element.password == password) data = true
        });
        return data;
    }
}