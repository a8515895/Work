import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FacebookModule } from 'ngx-facebook';
import { Angular2SocialLoginModule } from "angular2-social-login";

import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { routing } from './verify.routing';
import { AlertComponent } from './alert/alert.component';
import { AuthGuard } from './auth.guard';
import { AlertService } from './alert.service';
import { UserService } from './user.service'
import { AuthenticationService } from './authentication.service'
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
const providers = {
    "google": {
        "clientId": "37028354-7p7n4vq88848eesc6t60g25p22fsgduq.apps.googleusercontent.com"
    },
    "facebook": {
        "clientId": "285535681795531",
        "apiVersion": "v2.8"
    }
};
@NgModule({
    imports: [
        BrowserModule,
        FacebookModule.forRoot(),
        FormsModule,
        routing,
        HttpModule,
    ],
    exports: [LoginComponent],
    declarations: [
        AlertComponent,
        LoginComponent,
        RegisterComponent]
    ,
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        MockBackend,
        BaseRequestOptions
    ],
})
export class VerifyModule { }
Angular2SocialLoginModule.loadProvidersScripts(providers);
