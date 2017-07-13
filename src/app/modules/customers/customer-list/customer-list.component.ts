import { CustomersService } from './../customers.service';
import { FilterService } from '../filter.service';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { Customer } from './../customer';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [FilterService, CustomersService]
})
export class CustomerListComponent implements OnInit {
  dataTest = '';

  @Output("addDetailTab") valueTab = new EventEmitter<any>();
  customers: Customer[];
  customersList: any;
  customerTempList: any;
  checkedFilter = [
    { fullname: true },
    { mobile: false },
    { address: false },
  ];
  //
  prevPage: boolean = false;
  nextPage: boolean = false;
  currentPage: number;
  pagination = new Array();
  //
  hiddenBtnSearch: boolean = true;
  hiddenSearchInput: boolean = true;
  hiddenSearchInput2: boolean = false;
  //
  @ViewChild('slName') slName: any;
  @ViewChild('inName') inName: any;
  nameCheck: boolean = false;
  mobileCheck: boolean = false;
  adCheck: boolean = false;
  //
  ngAfterViewChecked() {
    if (this.nameCheck == true || this.mobileCheck == true || this.adCheck == true) {
      this.hiddenBtnSearch = false
    } else {
      this.hiddenBtnSearch = true
    }
  }
  //
  constructor(
    private customersService: CustomersService,
    private routeParams: ActivatedRoute,
    private filterService: FilterService
  ) {
    this.getAPI();
  }

  setDisplayInput() {
    this.hiddenSearchInput = false;
    this.hiddenSearchInput2 = true;
  }
  getAPI(link = "https://api-popupcontact-02.mitek.vn:4431/api/v1/customers") {
    this.customersService.getCustomers(link).subscribe(
      (res: any) => {
        let i = 0;
        let j = 0;
        this.customersList = res.data;
        this.customerTempList = res.data;
        this.pagination = [];
        for (i; i < res.last_page; i++) {
          j++;
          if (i != 0) {
            this.pagination.push({ url: 'https://api-popupcontact-02.mitek.vn:4431/api/v1/customers?page=' + (i + 1), index: i });
          }
          else this.pagination.push({ url: 'https://api-popupcontact-02.mitek.vn:4431/api/v1/customers', index: i });

          if (res.current_page >= 7) {
            if (j <= res.current_page - 6) this.pagination.shift();
          }
          if (this.pagination.length == 10) {
            break;
          }

        }
        this.currentPage = res.current_page;
        if (res.next_page_url != null) this.nextPage = true;
        if (res.prev_page_url != null) this.prevPage = true;
      }
    );
  }
  btnNextPage() {
    this.clickGetAPI('https://api-popupcontact-02.mitek.vn:4431/api/v1/customers?page=' + (this.currentPage + 1));
  }
  btnPrevPage() {
    this.clickGetAPI('https://api-popupcontact-02.mitek.vn:4431/api/v1/customers?page=' + (this.currentPage - 1));
  }
  setClassAcitve(index: number) {
    return {
      'active': this.currentPage == index
    }
  }
  clickGetAPI(link) {
    return this.getAPI(link);
  }
  ngOnInit() {

    this.getAPI();
  };
  getValueTab(value: any) {

    return this.valueTab.emit({ id: value.id, name: value.name });
  }
  filter() {
    let temp = new Array();
    console.log(this.slName.nativeElement.value);
    if (this.nameCheck) {
      switch (this.slName.nativeElement.value) {
        case "=":
          temp = this.customerTempList.filter(element => {
            return element.firstName == this.inName.nativeElement.value
          });
          break;
        case "<>":
          temp = this.customerTempList.filter(element => {
            return element.firstName != this.inName.nativeElement.value
          });
          break;
        case "like":
          temp = this.customerTempList.filter(element => {
            return element.firstName.toLowerCase().indexOf(this.inName.nativeElement.value.toLowerCase()) > -1;
          });
          break;
        case "unlike":
          temp = this.customerTempList.filter(element => {
            return element.firstName.toLowerCase().indexOf(this.inName.nativeElement.value.toLowerCase()) == -1;
          });
          break;
      }
      if(this.adCheck){
        
      }
      return this.customersList = temp;
    }
  }
}
