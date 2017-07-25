import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainNavigationComponent } from './layouts/main-navigation/main-navigation.component';
import {LoginComponent} from './modules/verify/login/login.component';

const routes: Routes = [
  { path: '',redirectTo : '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'main' , component: MainNavigationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule],
})
export class AppRoutingModule { }
