import { CustomersService } from './../customers.service';
import { Component, OnInit,Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  @Input('value') value :any;
  customerList = [];
  tabs = [];
  constructor(
    public customersService: CustomersService,
    private routeParams: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.value);
  }

}
