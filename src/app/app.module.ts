import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'; //Need import this for [(ngModel)] in form
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';


//All process is execute in the modules
 //Routing global
import { AppComponent } from './app.component';

import {LayoutModule} from './layouts/layout.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    LayoutModule,
    
  ],
  providers: [],
  
  bootstrap: [AppComponent]
})

export class AppModule { }
