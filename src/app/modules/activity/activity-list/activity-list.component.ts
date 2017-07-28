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
    tabsDisplay: any;
    displayNext: boolean = false;
    displayPrev: boolean = false;
    activities: Activity[] = [];
    constructor(private tabservice: TabService, private av: ActivityService) { }
    getActivity(id: string) {
        return this.av.getActivityById(id);
    }
    ngOnInit() {
        this.activities = this.av.listActivity();
        this.tabs = this.tabservice.getListATab();
    }
    ngAfterViewChecked() {
        //console.log(this.displayNextPrev);
    }
    nextTab() {
        this.tabsDisplay = this.tabservice.nextATab();
        if (this.tabservice.checkNextPrev() != -1 && this.tabservice.checkNextPrev() != 1) this.displayPrev = true
        if (this.tabservice.checkNextPrev() != -1 && this.tabservice.checkNextPrev() == 2) this.displayNext = false
        return this.tabsDisplay
    }
    prevTab() {
        this.tabsDisplay = this.tabservice.prevATab();
        if (this.tabservice.checkNextPrev() != -1 && this.tabservice.checkNextPrev() != 2) this.displayNext = true
        if (this.tabservice.checkNextPrev() != -1 && this.tabservice.checkNextPrev() == 1) this.displayPrev = false
        return this.tabsDisplay
    }
    addTab(id: string, name: string) {
        this.tabservice.addATab({ id: id, name: name });
        this.tabsDisplay = this.tabservice.getListDisplayATab();
        this.tabs = this.tabservice.getListATab();
        jQuery('.tab-activity').removeClass('active');
        jQuery('#tab_' + id).addClass('active');
        jQuery('.acTab-active').removeClass('acTab-active');
        jQuery('#acTab_' + id).addClass('acTab-active');
        this.chooseTab(id);
        if (this.tabservice.checkNextPrev() == 0 && this.tabservice.checkNextPrev() != -1) {
            this.displayPrev = true;
            this.displayNext = true
        }
        else if (this.tabservice.checkNextPrev() != -1 && this.tabservice.checkNextPrev() == 1) {
            this.displayPrev = false;
            this.displayNext = true;
        }
        else if (this.tabservice.checkNextPrev() != -1 && this.tabservice.checkNextPrev() == 2) {
            this.displayPrev = true;
            this.displayNext = false;
        }
        return this.tabsDisplay;
    }
    closeTab(index: number) {
        this.tabservice.closeATab(index);
        if (this.tabservice.checkNextPrev() == -1) {
            this.displayPrev = false;
            this.displayNext = false;
        } else {
            if (this.tabservice.checkNextPrev() != -1 && this.tabservice.checkNextPrev() == 1) this.displayNext = true
            if (this.tabservice.checkNextPrev() != -1 && this.tabservice.checkNextPrev() == 2) this.displayPrev = true
        }
        return this.tabsDisplay = this.tabservice.getListDisplayATab();
    }
    chooseTab(id: string) {
        jQuery('.acTab-active').removeClass('acTab-active');
        jQuery('#acTab_' + id).addClass('acTab-active');
        jQuery('#' + id).addClass('active');
    }
}