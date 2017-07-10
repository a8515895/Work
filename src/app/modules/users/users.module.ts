import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { UserListComponent } from './user-list/user-list.component';
import  {UsersRoutingModule} from './users.routing';
import { CommonModule } from '../../common/common.module';

@NgModule(
    {
        imports: [BrowserModule, FormsModule, CommonModule, UsersRoutingModule],
        declarations: [UserListComponent]
    }
)

export class UsersModule { }