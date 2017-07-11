import { CustomersService } from './../customers.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  @Input('value') value: any;
  @ViewChild('test') test: ElementRef;
  @ViewChild('inSearch') inSearch: ElementRef;
  customerDetail = {
    status: '',
    info: {
      id: '',
      firstName: '',
      lastName: '',
      titleId: '',
      email: '',
      tags_list: [{
        id: '',
        tag_name: '',
      }],
    },
    tags: [{
      id: '',
      tag_name: ''
    }]
  };
  displayUL: boolean = false;
  number_list: string = "";
  constructor(
    public customersService: CustomersService,
    private routeParams: ActivatedRoute
  ) { }
  ngOnInit() {    
    this.customersService.getDetailCustomers(this.value).subscribe(
      (res: any) => {
        this.customerDetail = res;
      }
    );
    var availableTags = [
      {name : "ActionScript"}
    ];
    jQuery(this.inSearch.nativeElement).autocomplete({
      source: availableTags,
    })    
  }
  ngAfterViewInit(){
    jQuery('.tab-pane').removeClass('active');  
    jQuery('#'+this.value).addClass('active');
  }
  checkInputSearch($event) {
    this.displayUL = true;
    if (this.inSearch.nativeElement.value == "") {
      this.displayUL = false;
    }
    else {
    }
  }
  selectTag(val: any) {
    let check: boolean = true;
    console.log(val);
    this.customerDetail.tags.forEach(element => {
      if (element.id == val) {
        this.customerDetail.info.tags_list.forEach(element2 => {
          if (element2.id == val) check = false;
        });
        if (check) this.customerDetail.info.tags_list.push({ id: element.id, tag_name: element.tag_name });
      }
    })
    return this.customerDetail.info.tags_list;
  }
  addCall($event, val: string) {
    this.number_list = $event.value;
    this.number_list += val;
  }
  checkInput($event) {
    if (isNaN($event.key)) return false;
  }
  clearCall() {
    return this.number_list = "";
  }
  removeTab(id: number) {
    return this.customerDetail.info.tags_list.splice(id, 1);
  }

}
