import { CustomersService } from './../customers.service';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Customer } from './../customer';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  // providers : [ CustomersService ]
})
export class CustomerListComponent implements OnInit {
  dataTest = '';

  @Output("addDetailTab") valueTab = new EventEmitter<any>();
  filter: Customer = new Customer();
  customers : Customer[];
  customersList: any;
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

  constructor(
    private customersService: CustomersService,
    private routeParams: ActivatedRoute,
  ) {
    this.getAPI();
  }
  getAPI(link = "https://api-popupcontact-02.mitek.vn:4431/api/v1/customers") {
    this.customersService.getCustomers(link).subscribe(
      (res: any) => {
        let i = 0;
        let j = 0;
        this.customersList = res.data;
        this.checkedFilter = res.data;
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
    this.customersService.TestGet().subscribe(
      (customers : Customer[]) => {
        this.customers = customers;
      }) 
  };


  getValueTab(value: any) {
        return this.valueTab.emit({id : value.id,name : value.name});
  }
}
