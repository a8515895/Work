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
  @ViewChild('slAddCol') slAddCol;
  @ViewChild('inAddNameCol') inAddNameCol;
  @ViewChild('inAddValCol') inAddValCol;
  displayKeyColumn = new Array();
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
  arrKeyList = [{ id: "", name: "" }];

  addColModel: any;
  addColTexts: IMultiSelectTexts = {
    checkAll: 'Chọn Hết',
    uncheckAll: 'Bỏ Chọn Hết',
    checked: 'Tên Hiển Thị',
    checkedPlural: 'Tên Hiển Thị',
    searchPlaceholder: 'Find',
    defaultTitle: 'Chọn Tên Hiển Thị',
    allSelected: 'Chọn Tất Cả',
  };
  addColSettings: IMultiSelectSettings = {
    dynamicTitleMaxItems: 0,
    enableSearch: true,
    showCheckAll: true,
    showUncheckAll: true,
    displayAllSelectedText: true
  };
  arrAddColList: any;
  tempColumn = new Array();
  arr = [
    {
      id: '1',
      name: 'huỳnh khoa',
      phone: '0938247099',
      mail: 'a8515895@gmail.com',
      address: '243 tạ quang bửu',
      date: '22/08/2017'
    },
    {
      id: '2',
      name: 'ngọc bu',
      phone: '01635076638',
      mail: 'b8515895@gmail.com',
      address: 'Konoha',
      date: '10/08/2017'
    },
    {
      id: '3',
      name: 'bin bé bỏng',
      phone: '0991235468',
      mail: 'd8515895@gmail.com',
      address: '85 Trần Phú',
      date: '08/07/2017'
    },
    {
      id: '4',
      name: 'khoi trần huỳnh',
      phone: '0175549854',
      mail: 'e8515895@gmail.com',
      address: '15 Phàm Phú',
      date: '15/09/2017'
    },
    {
      id: '5',
      name: 'thanh ngọc tri',
      phone: '',
      mail: 'f8515895@gmail.com',
      address: '11/5 Phạm Văn Thư',
      date: '11/07/2017'
    },
    {
      id: '6',
      name: 'tôn thất bảo minh',
      phone: '',
      mail: '',
      address: '',
      date: '04/06/2017'
    },
    {
      id: '7',
      name: 'huỳnh',
      phone: '',
      mail: 'f8515895@gmail.com',
      address: '11/5 Phạm Văn Thư',
      date: '17/07/2017'
    },
    {
      id: '8',
      name: 'tôn thất bảo minh',
      phone: '',
      mail: '',
      address: '',
      date: '16/07/2017'
    },
  ];
  arrDisplay = [
    {
      id: '1',
      name: 'huỳnh khoa',
      phone: '0938247099',
      mail: 'a8515895@gmail.com',
      address: '243 tạ quang bửu',
      date: '22/08/2017'
    },
    {
      id: '2',
      name: 'ngọc bu',
      phone: '01635076638',
      mail: 'b8515895@gmail.com',
      address: 'Konoha',
      date: '10/08/2017'
    },
    {
      id: '3',
      name: 'bin bé bỏng',
      phone: '0991235468',
      mail: 'd8515895@gmail.com',
      address: '85 Trần Phú',
      date: '08/07/2017'
    },
    {
      id: '4',
      name: 'khoi trần huỳnh',
      phone: '0175549854',
      mail: 'e8515895@gmail.com',
      address: '15 Phàm Phú',
      date: '15/09/2017'
    },
    {
      id: '5',
      name: 'thanh ngọc tri',
      phone: '',
      mail: 'f8515895@gmail.com',
      address: '11/5 Phạm Văn Thư',
      date: '11/07/2017'
    },
    {
      id: '6',
      name: 'tôn thất bảo minh',
      phone: '',
      mail: '',
      address: '',
      date: '04/06/2017'
    },
  ];
  plusCol() {
    let check = true;
    Object.keys(this.arr).forEach(e => {
      if (e == this.inAddNameCol.nativeElement.value) check = false;
    });
    this.arr.forEach(element => {
      this.addColModel.forEach(e => {
        if (element.id == e) {
          element[this.inAddNameCol.nativeElement.value] = this.inAddValCol.nativeElement.value;
        }
      });

    });
    return this.ngAfterViewInit();
  }
  //

  //Filter
  @ViewChild('slName') slName: any;
  @ViewChild('inName') inName: any;
  @ViewChild('slMobile') slMobile: any;
  @ViewChild('inMobile') inMobile: any;
  @ViewChild('slAddress') slAddress: any;
  @ViewChild('inAddress') inAddress: any;
  @ViewChild('slDate') slDate: any;
  @ViewChild('inDate') inDate: any
  nameCheck: boolean = false;
  mobileCheck: boolean = false;
  adCheck: boolean = false;
  dateCheck: boolean = false;
  hiddenBtnSearch: boolean = true;
  hiddenSearchInput: boolean = true;
  hiddenSearchInput2: boolean = false;
  filter() {
    let temp = this.customerTempList;    
    let length;
    if (this.nameCheck) {
      length = this.inName.nativeElement.value.split("").length;
      switch (this.slName.nativeElement.value) {
        case "=":
          temp = temp.filter(element => {
            console.log(element.firstName);
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
        case "null":
          temp = temp.filter(element => {
            return element.firstName == "";
          });
          break;
        case "full":
          temp = temp.filter(element => {
            return element.firstName != "";
          });
          break;
        case "begin":
          temp = temp.filter(element => {
            return element.firstName.toLowerCase().substr(0, length) == this.inName.nativeElement.value.toLowerCase();
          });
          break;
        case "end":
          temp = temp.filter(element => {
            return element.firstName.toLowerCase().substr(-length, length) == this.inName.nativeElement.value.toLowerCase();
          });
          break;

      }
    }
    if (this.mobileCheck) {
      length = this.inMobile.nativeElement.value.split("").length;
      switch (this.slMobile.nativeElement.value) {
        case "=":
          temp = temp.filter(element => {
            return element.phone == this.inMobile.nativeElement.value
          });
          break;
        case "<>":
          temp = temp.filter(element => {
            return element.phone != this.inMobile.nativeElement.value
          });
          break;
        case "like":
          temp = temp.filter(element => {
            return element.phone.toLowerCase().indexOf(this.inMobile.nativeElement.value.toLowerCase()) > -1;
          });
          break;
        case "unlike":
          temp = temp.filter(element => {
            return element.phone.toLowerCase().indexOf(this.inMobile.nativeElement.value.toLowerCase()) == -1;
          });
          break;
        case "null":
          temp = temp.filter(element => {
            return element.phone == "";
          });
          break;
        case "full":
          temp = temp.filter(element => {
            return element.phone != "";
          });
          break;
        case "begin":
          temp = temp.filter(element => {
            return element.phone.toLowerCase().substr(0, length) == this.inMobile.nativeElement.value.toLowerCase();
          });
          break;
        case "end":
          temp = temp.filter(element => {
            return element.phone.toLowerCase().substr(-length, length) == this.inMobile.nativeElement.value.toLowerCase();
          });
          break;
      }
    }
    if (this.adCheck) {
      length = this.inAddress.nativeElement.value.split("").length;
      switch (this.slAddress.nativeElement.value) {
        case "=":
          temp = temp.filter(element => {
            return element.address == this.inAddress.nativeElement.value
          });
          break;
        case "<>":
          temp = temp.filter(element => {
            return element.address != this.inAddress.nativeElement.value
          });
          break;
        case "like":
          temp = temp.filter(element => {
            return element.address.toLowerCase().indexOf(this.inAddress.nativeElement.value.toLowerCase()) > -1;
          });
          break;
        case "unlike":
          temp = temp.filter(element => {
            return element.address.toLowerCase().indexOf(this.inAddress.nativeElement.value.toLowerCase()) == -1;
          });
          break;
        case "null":
          temp = temp.filter(element => {
            return element.address == "";
          });
          break;
        case "full":
          temp = temp.filter(element => {
            return element.address != "";
          });
          break;
        case "begin":
          temp = temp.filter(element => {
            return element.address.toLowerCase().substr(0, length) == this.inAddress.nativeElement.value.toLowerCase();
          });
          break;
        case "end":
          temp = temp.filter(element => {
            return element.address.toLowerCase().substr(-length, length) == this.inAddress.nativeElement.value.toLowerCase();
          });
          break;

      }
    }
    if (this.dateCheck) {
      let date = new Date(this.inDate.nativeElement.value.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
      let d = date.getDate();
      let m = "0" + Number(date.getMonth() + 1);
      let y = date.getFullYear();
      let day = d + '/' + m + '/' + y;
      switch (this.slDate.nativeElement.value) {
        case "=":
          temp = temp.filter(element => {
            return new Date(element.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")).getTime() == new Date(day.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")).getTime();
          });
          break;
        case "before":
          temp = temp.filter(element => {
            return new Date(element.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")) < new Date(day.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
          });
          break;
        case "after":
          temp = temp.filter(element => {
            return new Date(element.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")) > new Date(day.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
          });
          break;
        case "today":
          temp = temp.filter(element => {
            return new Date(element.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")).getTime() == new Date().getTime();
          });
          break;
        case "yesterday":
          temp = temp.filter(element => {
            return new Date(element.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")) > new Date(day.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
          });
          break;
        case "null":
          temp = temp.filter(element => {
            return element.date == "";
          });
          break;
        case "full":
          temp = temp.filter(element => {
            return element.date != "";
          });
          break;

      }
    }
    return this.customersList = temp;
  }
  endFilter() {
    this.arrDisplay = this.arr;
  }
  //
  ngAfterViewChecked() {
    if (this.nameCheck == true || this.mobileCheck == true || this.adCheck == true || this.dateCheck == true) {
      this.hiddenBtnSearch = false
    } else {
      this.hiddenBtnSearch = true
    }
  }
  ngAfterViewInit() {
    this.arrKeyList = new Array();
    this.arrAddColList = new Array();
    this.arr.forEach(e => {
      this.arrAddColList.push({ id: e.id, name: e.name });
    });
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
        Object.keys(this.customersList[0]).forEach(e => {
          if (e != 'id' && e != 'firstName' && e != 'lastName' && e != 'mobile')
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
    return this.valueTab.emit({ id: value.id, name: value.firstName });
  }
  onChange() {
    // this.displayColumn = this.optionsModel;
    let temp = new Array();
    this.displayKeyColumn = this.optionsModel;
  }
  onChange2() {
    console.log(this.addColModel);
  }
}
