import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomersRoutingModule } from './customers.routing';
import { CommonModule } from '../../common/common.module';

@NgModule(
    {
        imports: [BrowserModule, FormsModule, CommonModule, CustomersRoutingModule],
        declarations: [CustomerListComponent, CustomerDetailComponent],
        exports : [CustomerListComponent,CustomerDetailComponent]
    }
)

export class CustomersModule { }