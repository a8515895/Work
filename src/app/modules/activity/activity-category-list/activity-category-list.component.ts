import { Component, OnInit } from '@angular/core';
import { Activity } from '../activity';
import { ActivityService } from '../activity.service';
import { TabService } from '../../../layouts/TabService.service';
declare var jQuery: any;
@Component({
    selector: 'activity-category-list',
    templateUrl: 'activity-category-list.component.html',
    styleUrls: ['style.css'],
    providers: [ActivityService],
})
export class ActivityCategoryListComponent implements OnInit {
    activities: Activity[] = [];
    tabs : any;
    activityDetail: any;
    constructor(private av: ActivityService, private tabservice: TabService) {
        this.activities = av.listActivity();
    }
    getActivity(id: string) {
        return this.activityDetail = this.av.getActivityById(id);
    }
    addTab(id: string, name: string) {
        this.tabservice.addATab({ id: id, name: name });
        this.tabservice.getListDisplayATab();
        jQuery('.tab-activity').removeClass('active');
        jQuery('#tab_' + id).addClass('active');
        jQuery('.acTab-active').removeClass('acTab-active');
        jQuery('#acTab_' + id).addClass('acTab-active');
        this.chooseTab(id);
        return this.tabservice.getListDisplayATab();;
    }
    chooseTab(id: string) {
        return jQuery('#'+id).addClass('active');
    }
    ngOnInit() { }
}