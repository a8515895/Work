import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MdButtonModule, MdCheckboxModule, MdSnackBarModule, MdInputModule, MdSelectModule } from '@angular/material';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';


const routes: Routes = [
    {
        path: 'customer',
        component: CustomerDetailComponent
    },
    {
        path: 'customers',
        component: CustomerListComponent
    }
];

@NgModule(
    {
        imports: [
            MdButtonModule, MdCheckboxModule, MdSnackBarModule, MdInputModule, 
            BrowserAnimationsModule,
            RouterModule.forRoot(routes)],
        exports: [MdButtonModule, MdCheckboxModule, MdSnackBarModule, MdInputModule, RouterModule]
    }
)

export class CustomersRoutingModule { } 