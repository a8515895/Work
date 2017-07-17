import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdAutocompleteModule, MdInputModule } from '@angular/material';
import { CommonModule } from '../../common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MdAutocompleteModule,
        MultiselectDropdownModule,
        MdInputModule
    ],
    exports: [ActivityListComponent, ActivityDetailComponent],
    declarations: [ActivityListComponent, ActivityDetailComponent],
    providers: [],
})
export class ActivityModule { }
