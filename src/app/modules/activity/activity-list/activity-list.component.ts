import { Component, OnInit } from '@angular/core';
import { TabService } from '../../../layouts/TabService.service';
import { Activity } from '../activity';
import { ActivityService } from '../activity.service'
declare var jQuery: any;
@Component({
    selector: 'activity-list',
    templateUrl: 'activity-list.component.html',
    styleUrls: ['style.css'],
    providers: [ActivityService]
})

export class ActivityListComponent implements OnInit {
    tabs: any;

    activities: Activity[] = [];
    constructor(private tabservice: TabService, private av: ActivityService) { }
    getActivity(id: string) {
        return this.av.getActivityById(id);
    }
    ngOnInit() {
        this.activities = this.av.listActivity();
        this.tabs = this.tabservice.getListATab();
    }
    nextTab() {
        return this.tabs = this.tabservice.nextATab();
    }
    prevTab() {
        return this.tabs = this.tabservice.prevATab();
    }
    addTab(id: string, name: string) {
        this.tabservice.addATab({ id: id, name: name });
        this.tabs = this.tabservice.getListDisplayATab();
        jQuery('.tab-activity').removeClass('active');        
        jQuery('#tab_' + id).addClass('active');
        jQuery('.acTab-active').removeClass('acTab-active');
        jQuery('#acTab_'+id).addClass('acTab-active');
        this.chooseTab(id);
        return this.tabs;
    }
    closeTab(index: number) {
        this.tabservice.closeATab(index);
        return this.tabs = this.tabservice.getListDisplayATab();
    }
    chooseTab(id: string) {
        jQuery('#' + id).addClass('active');
    }
}