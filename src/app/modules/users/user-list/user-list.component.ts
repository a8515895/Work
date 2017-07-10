import { RestApiService } from '../../../common/restapi.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  dataTest = '';
  constructor(private apiService : RestApiService) { }

  ngOnInit() {
    this.dataTest = this.apiService.getDataUsersTest();
  }

}
