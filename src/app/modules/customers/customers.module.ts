import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule,MdAutocompleteModule,MdInputModule} from '@angular/material';
import { CustomersRoutingModule } from './customers.routing';
import { CommonModule } from '../../common/common.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';


@NgModule(
    {
        imports: [
            BrowserModule, 
            FormsModule,
            CommonModule,
            CustomersRoutingModule,
            BrowserAnimationsModule,
            ReactiveFormsModule,
            MdAutocompleteModule,
            MdInputModule
        ],
        declarations: [CustomerListComponent, CustomerDetailComponent],
        exports : [
            CustomerListComponent,
            CustomerDetailComponent,
            MdAutocompleteModule,
            MdInputModule
        ]
    }
)

export class CustomersModule { }