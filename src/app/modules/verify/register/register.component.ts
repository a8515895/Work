import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../alert.service';
import { UserService } from '../user.service'

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls:['../style.css'],
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
        if (localStorage.getItem("currentUser") != null) router.navigate(['/main']);
    }
    register() {
        this.loading = true;
        if(this.userService.createUser(this.model)){
            this.router.navigate(['/login']);
        }else{
            this.alertService.error("Ten Dang Ky Da Ton Tai");
            this.loading = false;
        }
        
    }
}