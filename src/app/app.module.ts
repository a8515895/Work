import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'; //Need import this for [(ngModel)] in form
import { RouterModule,Routes  } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//All process is execute in the modules
 //Routing global
import { AppComponent } from './app.component';
import {AppRoutingModule} from './AppRoute.routing'
import {LayoutModule} from './layouts/layout.module';
import {VerifyModule} from './modules/verify/verify.module'; //Load module users
@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [    
    BrowserModule,
    HttpModule,
    FormsModule,
    LayoutModule,
    VerifyModule,
    RouterModule ,
    AppRoutingModule,    
  ],
  providers: [],
  
  bootstrap: [AppComponent]
})

export class AppModule { }
