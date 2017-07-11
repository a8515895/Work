import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabService } from '../TabService.service';
declare var jQuery : any;
@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css'],
  providers: [TabService]
})
export class MainNavigationComponent {
  public tabs: any;
  public tabDetail: any;
  public hid: string = "none";
  public customerDetail: any;
  constructor(public tabservice: TabService) {
    this.tabs = this.tabservice.getListDisplayTab();
    this.tabDetail = this.tabservice.getListTabDetail();

  }
  setAppear() {
    this.hid = ""
  }
  setHidden() {
    this.hid = "none"
  }
  addTab(id: string, name: string) {
    this.tabservice.addTab({ id: id, name: name });
    return this.tabs = this.tabservice.getListDisplayTab();
  }
  addTicketTab() {
    this.tabservice.addTicketTab();
    return this.tabs = this.tabservice.getListDisplayTab();
  }
  closeTab(index: number) {
    this.tabservice.closeTab(index);
    return this.tabs = this.tabservice.getListDisplayTab();
  }
  nextTab() {
    return this.tabs = this.tabservice.nextTab();
  }
  prevTab() {
    return this.tabs = this.tabservice.prevTab();
  }
  addTabDetail($event) {
    this.tabservice.addTabDetail({ id: $event.id, name: $event.name });
    this.customerDetail = $event;    
    return this.tabs = this.tabservice.getListDisplayTab();
  }
  chooseTab(id : number){
    jQuery('.tab-head').removeClass('active');
    jQuery('#'+id).addClass('active');
  }
}
