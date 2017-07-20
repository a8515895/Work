import { Component, OnInit, Input } from '@angular/core';
import { TabService } from '../../../layouts/TabService.service';
import { Activity } from '../activity';
import { ActivityService } from '../activity.service'
@Component({
    selector: 'activity-detail',
    templateUrl: 'activity-detail.component.html',
    styleUrls: ['style.css'],
    providers: [TabService, ActivityService],
})
export class ActivityDetailComponent implements OnInit {
    ac: Activity = {
        id: "",
        name: "",
        create_by: "",
        date: "",
        type: "",
    };
    setDisplayInput: boolean = true;
    setDisplayText: boolean = false;
    displayInput() {
        this.setDisplayInput = false;
        this.setDisplayText = true;
    }
    displayText() {
        this.setDisplayInput = true;
        this.setDisplayText = false;
    }
    @Input('value') value: Activity;
    ngOnInit() {
    }
    ngAfterViewChecked() {
        if (this.value != null) {
            this.ac = this.value
        }
    }
}