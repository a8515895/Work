import { Component, OnInit } from '@angular/core';
import { Activity } from '../activity';
import { ActivityService } from '../activity.service'
@Component({
    selector: 'activity-category-list',
    templateUrl: 'activity-category-list.component.html',
    styleUrls: ['style.css'],
    providers: [ActivityService],
})
export class ActivityCategoryListComponent implements OnInit {
    activities: Activity[] = [];
    activityDetail : any;
    constructor(private av: ActivityService) {
        this.activities = av.listActivity();
    }
    getActivity(id: string) {
        return this.activityDetail = this.av.getActivityById(id);
    }
    ngOnInit() { }
}