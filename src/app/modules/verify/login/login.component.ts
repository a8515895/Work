import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../alert.service';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service'
import { AuthService } from "angular2-social-login";
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls:['../style.css'],
    providers: [AuthService]
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    constructor(
        private social: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private fb: FacebookService,
        private userService: UserService,
        private alertService: AlertService) {
        if (localStorage.getItem("currentUser") != null) router.navigate(['/main']);
        let initParams: InitParams = {
            appId: '285535681795531',
            xfbml: true,
            version: 'v2.8'
        };
        fb.init(initParams);
    }
    ngOnInit() {
        // reset login status
        console.log(this.userService.getAllUser());
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/main';
    }
    sub: any;
    res : any = {
        uid : '',
        email : '',
        name : ''
    };
    signIn(provider) {
        this.sub = this.social.login(provider).subscribe(data => {
            this.res = data;
            this.userService.createUser({
                id: this.res.uid,
                username: this.res.email,
                email: this.res.email,
                password: "",
                name: this.res.name,
            });
            this.authenticationService.login(this.res.email, '');
            this.router.navigate([this.returnUrl]);
            console.log(this.res);
        })
    }
    //Login normal
    login() {
        this.loading = true;
        if (this.authenticationService.login(this.model.username, this.model.password)) {
            this.router.navigate([this.returnUrl]);
        } else {
            this.alertService.error("Dang Nhap that bai");
        }
    }
}