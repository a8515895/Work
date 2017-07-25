import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabService } from '../TabService.service';
import {AuthenticationService} from '../../modules/verify/authentication.service'
declare var jQuery : any;
@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css'],
  providers: [TabService,AuthenticationService]
})
export class MainNavigationComponent {
  public tabs: any;
  public tabDetail: any;
  public hid: string = "none";
  public customerDetail: any;
  constructor(public tabservice: TabService,router: Router,private auth : AuthenticationService) {
    this.tabs = this.tabservice.getListDisplayTab();
    this.tabDetail = this.tabservice.getListTabDetail();
    if(localStorage.getItem("currentUser")==null) router.navigate(['/login']);

  }
  logout(){
    return this.auth.logout();
  }
  setAppear() {
    this.hid = ""
  }
  setHidden() {
    this.hid = "none"
  }
  addTab(id: string, name: string) {
    this.tabservice.addTab({ id: id, name: name });
    this.chooseTab(id);
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
  chooseTab(id : string){
    jQuery('.tab-head').removeClass('active');
    jQuery('#'+id).addClass('active');
  }
}
