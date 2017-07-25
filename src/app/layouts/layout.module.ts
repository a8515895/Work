import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { CustomersModule } from '../modules/customers/customers.module'; //Load modules customer
import { UsersModule } from '../modules/users/users.module'; //Load module users

import { ActivityModule } from '../modules/activity/activity.module'; //Load module users

@NgModule({
    imports: [BrowserModule,CustomersModule,UsersModule,ActivityModule],
    exports: [MainNavigationComponent,NotFoundComponent],
    declarations: [MainNavigationComponent,NotFoundComponent],
    providers: [],
})
export class LayoutModule { }
