import { CustomersService } from './../customers.service';
import { FilterService } from '../filter.service';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { Customer } from './../customer';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [FilterService, CustomersService]
})
export class CustomerListComponent implements OnInit {
  dataTest = '';
  optionsModel: any[];
  @Output("addDetailTab") valueTab = new EventEmitter<any>();
  customers: Customer[];
  customersList: any;
  customerTempList: any;
  checkedFilter = [
    { fullname: true },
    { mobile: false },
    { address: false },
  ];
  //Pagination
  prevPage: boolean = false;
  nextPage: boolean = false;
  currentPage: number;
  pagination = new Array();
  //

  //Plus Column
  myOptions: IMultiSelectOption[];
  myTexts: IMultiSelectTexts = {
    checkAll: 'Chọn Hết',
    uncheckAll: 'Bỏ Chọn Hết',
    checked: 'Cột Hiển Thị',
    checkedPlural: 'Cột Hiển Thị',
    searchPlaceholder: 'Find',
    defaultTitle: 'Chọn Cột Hiển Thị',
    allSelected: 'Chọn Tất Cả',
  };
  mySettings: IMultiSelectSettings = {
    dynamicTitleMaxItems: 0,
    showCheckAll: true,
    showUncheckAll: true,
    displayAllSelectedText: true
  };
  arrKeyList = new Array();
  tempColumn = new Array();
  arr = [
    {
      id: '1',
      name: 'khoa',
      phone: '0938247099',
      mail: 'a8515895@gmail.com',
    },
    {
      id: '2',
      name: 'bu',
      phone: '01635076638',
      mail: 'b8515895@gmail.com',
    },
    {
      id: '3',
      name: 'bin',
      phone: '0991235468',
      mail: 'd8515895@gmail.com',
    },
    {
      id: '4',
      name: 'khoi',
      phone: '0175549854',
      mail: 'e8515895@gmail.com',
    },
  ];
  displayColumn = [
    {
      value: [1, 'khoa']
    },
    {
      value: [2, 'bu']
    },
    {
      value: [3, 'bo']
    }
  ];
  displayKeyColumn = ['id', 'name'];
  hiddenColSelect: boolean = true;
  plusCol() {
    this.arrKeyList = Object.keys(this.customersList[0]);
    this.hiddenColSelect = false;
  }
  //

  //Filter
  @ViewChild('slName') slName: any;
  @ViewChild('inName') inName: any;
  @ViewChild('slMobile') slMobile: any;
  @ViewChild('inMobile') inMobile: any;
  nameCheck: boolean = false;
  mobileCheck: boolean = false;
  adCheck: boolean = false;
  hiddenBtnSearch: boolean = true;
  hiddenSearchInput: boolean = true;
  hiddenSearchInput2: boolean = false;
  filter() {
    let temp = this.customerTempList;
    if (this.nameCheck) {
      switch (this.slName.nativeElement.value) {
        case "=":
          temp = temp.filter(element => {
            return element.firstName == this.inName.nativeElement.value
          });
          break;
        case "<>":
          temp = temp.filter(element => {
            return element.firstName != this.inName.nativeElement.value
          });
          break;
        case "like":
          temp = temp.filter(element => {
            return element.firstName.toLowerCase().indexOf(this.inName.nativeElement.value.toLowerCase()) > -1;
          });
          break;
        case "unlike":
          temp = temp.filter(element => {
            return element.firstName.toLowerCase().indexOf(this.inName.nativeElement.value.toLowerCase()) == -1;
          });
          break;
      }
    }
    if (this.mobileCheck) {
      switch (this.slMobile.nativeElement.value) {
        case "=":
          temp = temp.filter(element => {
            return element.mobile == this.inMobile.nativeElement.value
          });
          break;
        case "<>":
          temp = temp.filter(element => {
            return element.mobile != this.inMobile.nativeElement.value
          });
          break;
        case "like":
          temp = temp.filter(element => {
            return element.mobile.toLowerCase().indexOf(this.inMobile.nativeElement.value.toLowerCase()) > -1;
          });
          break;
        case "unlike":
          temp = temp.filter(element => {
            return element.mobile.toLowerCase().indexOf(this.inMobile.nativeElement.value.toLowerCase()) == -1;
          });
          break;

      }
    }
    return this.customersList = temp;
  }
  //
  ngAfterViewChecked() {
    if (this.nameCheck == true || this.mobileCheck == true || this.adCheck == true) {
      this.hiddenBtnSearch = false
    } else {
      this.hiddenBtnSearch = true
    }
  }
  ngAfterViewInit() {
    this.arr;
    this.displayColumn = new Array();
    this.displayKeyColumn = new Array();
    Object.keys(this.arr[0]).forEach(e => {
      this.arrKeyList.push({ id: e, name: e });
    });
  }
  //
  constructor(
    private customersService: CustomersService,
    private routeParams: ActivatedRoute,
    private filterService: FilterService
  ) {
    //this.getAPI();
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
        Object.keys(res.data[0]).forEach(e => {
          this.arrKeyList.push({ id: e, name: e });
        });
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
  };
  getValueTab(value: any) {
    return this.valueTab.emit({ id: value.id, name: value.name });
  }
  onChange() {
    // this.displayColumn = this.optionsModel;
    let temp = new Array();
    this.displayKeyColumn = this.optionsModel;
  }
}
