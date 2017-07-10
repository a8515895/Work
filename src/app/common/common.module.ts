import { NgModule } from '@angular/core';
import { RestApiService } from './restapi.service';
import { CustomersService } from './../modules/customers/customers.service';

@NgModule(
    {
        providers: [RestApiService, CustomersService]
    }
)

export class CommonModule { }