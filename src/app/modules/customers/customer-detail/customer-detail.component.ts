import { CustomersService } from './../customers.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  isCollapsed : boolean = true
  @Input('value') value: any;
  @Input('mdAutocomplete') autocomplete;
  @ViewChild('test') test: ElementRef;
  @ViewChild('inSearch') inSearch: ElementRef;
  @ViewChild('testspan') testspan: ElementRef;
  displayInput: boolean = true;
  displayText: boolean = false
  customerDetail = {
    status: '',
    info: {
      id: '',
      firstname: '',
      address: '',
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
  ///
  stateCtrl: FormControl;
  filteredStates: any;
  states : any;

  ///
  displayUL: boolean = false;
  number_list: string = "";
  constructor(
    public customersService: CustomersService,
    private routeParams: ActivatedRoute
  ) {
    this.stateCtrl = new FormControl();
  }
  ngOnInit() {
    this.customersService.getDetailCustomers(this.value).subscribe(
      (res: any) => {
        this.customerDetail = res;
      }
    );

  }
  filterStates(val: string) {
    return val ? this.states.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.states;
  }
  autoComplete(val : any) {
    this.states=new Array();
    let check : boolean= true;
    this.customerDetail.tags.forEach(ele =>{
      this.customerDetail.info.tags_list.forEach(element2 => {
        if(ele.tag_name==element2.tag_name) check=false;   
      })
      if(check)this.states.push(ele.tag_name);
      check = true;
    });    
    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterStates(name));
    val.value="";
  }
  ngAfterViewInit() {

    jQuery('.tab-head').removeClass('active');
    jQuery('#' + this.value).addClass('active');
  }
  setDisplayInput() {
    this.displayInput = true;
    this.displayText = false;
  }
  setDisplayText(val: any) {
    console.log(val);
    this.displayInput = false;
    this.displayText = true;
  }
  checkInputSearch($event) {
    this.displayUL = true;
    if (this.inSearch.nativeElement.value == "") {
      this.displayUL = false;
    }
    else {
    }
  }
  setContentSearch() {
    var arr = new Array();
    this.customerDetail.tags.forEach(element => {
      arr.push(element.tag_name);
    })
    console.log(arr)
    jQuery(this.inSearch.nativeElement).autocomplete({
      source: arr
    })
  }
  selectTag(val: any) {
    let check: boolean = true;
    this.customerDetail.tags.forEach(element => {
      if (element.tag_name == val) {
        this.customerDetail.info.tags_list.forEach(element2 => {
          if (element2.tag_name == val) check = false;
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
