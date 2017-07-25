import { Injectable } from '@angular/core';
import {UserService} from './user.service'
@Injectable()
export class AuthenticationService {    
    constructor(private userService: UserService) { }
    login(username: string, password: string) {
        if(this.userService.checkUserLogin(username,password))
        {
            localStorage.setItem('currentUser',username);
            return true;
        }
        else{
            return false
        }
    }
    logout() {
        localStorage.removeItem('currentUser');
    }
}