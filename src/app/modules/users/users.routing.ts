import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
    {
        path: 'users',
        component: UserListComponent
    }
];

@NgModule(
    {
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    }
)

export class UsersRoutingModule { } 