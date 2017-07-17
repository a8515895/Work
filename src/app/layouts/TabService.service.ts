import { Injectable } from '@angular/core';
import { Tab } from './tab';
@Injectable()
export class TabService {
    private tabs: Tab[] = [];
    private tabDisplay: Tab[] = [];
    private tabDetail: Tab[] = [];
    private ticketTab = 0;
    constructor() {
        this.addTab(new Tab('qlkh', 'Quản Lý Khách Hàng'));
        this.addTab(new Tab('activity', 'Activity'));
    }
    getListTab() {
        return this.tabs;
    }
    getListTabDetail() {
        return this.tabDetail;
    }
    getListDisplayTab() {
        return this.tabDisplay;
    }
    addTab(tab: Tab) {
        let check: boolean = true;
        this.tabs.forEach(element => {
            if (element.id == tab.id) check = false;
        });
        if (check) {
            this.tabs.push(tab);
            if (this.tabs.length > 5) {
                this.tabDisplay = this.tabs.slice(this.tabs.length - 5, 5 + (this.tabs.length - 5));
            } else {
                this.tabDisplay = this.tabs;
            }
        }

    }
    addTicketTab() {
        this.addTab(new Tab(this.ticketTab.toString(), 'Ticket tab số ' + this.ticketTab));
        console.log(this.tabs);
        console.log(this.tabDisplay);
        console.log(this.tabDetail);
    }
    addTabDetail(tab: Tab) {
        this.addTab(new Tab(tab.id,tab.name));
        this.tabDetail.push(tab);
        console.log(this.tabs);
        console.log(this.tabDisplay);
        console.log(this.tabDetail);
    }
    closeTab(index: number) {
        let i = 0;
        for (i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].id == this.tabDisplay[index].id) break;
        }
        this.tabs.splice(i, 1);
        if (this.tabs.length > 5) {
            this.tabDisplay.splice(index, 1);
            let vitribatdau = 0;
            let vitricuoi = 4;
            for (i = 0; i < this.tabs.length; i++) {
                if (this.tabs[i].id == this.tabDisplay[0].id) vitribatdau = i;
                if (this.tabs[i].id == this.tabDisplay[3].id) vitricuoi = i;
            }
            if (this.tabs[vitricuoi + 1] == null) {
                this.tabDisplay.unshift(this.tabs[vitribatdau - 1]);
                console.log('vao vi tri cuoi null');
            }
            else {
                this.tabDisplay.push(this.tabs[vitricuoi + 1]);
                console.log('vao vi tri bat dau null');
            }
        }
        else {
            this.tabDisplay = this.tabs;
        }
        console.log(this.tabs);
        console.log(this.tabDisplay);
    }
    nextTab() {
        let vitribatdau = 0;
        let vitricuoi = 4;
        let i: number;
        for (i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].id == this.tabDisplay[0].id) vitribatdau = i;
            if (this.tabs[i].id == this.tabDisplay[4].id) vitricuoi = i;
        }
        if (this.tabs[vitricuoi + 1] != null) {
            this.tabDisplay.shift();
            this.tabDisplay.push(this.tabs[vitricuoi + 1]);
        }
        return this.tabDisplay;
    }
    prevTab() {
        let vitribatdau = 0;
        let vitricuoi = 4;
        let i: number;
        for (i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].id == this.tabDisplay[0].id) vitribatdau = i;
            if (this.tabs[i].id == this.tabDisplay[4].id) vitricuoi = i;
        }
        if (this.tabs[vitribatdau - 1] != null) {
            this.tabDisplay.pop();
            this.tabDisplay.unshift(this.tabs[vitribatdau - 1]);
        }
        return this.tabDisplay;
    }
}