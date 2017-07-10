import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Customer } from './customer';
import { Observable } from 'rxjs/Rx';

//Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CustomersService {
  constructor(private http: Http) { }

  //List api link
  private _api_getAllCustomers = 'https://api-popupcontact-02.mitek.vn:4431/api/v1/getCallsReport';

  getCustomersList() {
    return [
      { id: 'kh1', Name: "Khong Quoc Toan 01", Mobile: "0933961912", Phone: "", Email: 'Load from service', Address: '' },
      { id: 'kh2', Name: "Khong Quoc Toan 02", Mobile: "0933961912", Phone: "", Email: '', Address: '' },
      { id: 'kh3', Name: "Khong Quoc Toan 03", Mobile: "0933961912", Phone: "", Email: '', Address: '' },
      { id: 'kh4', Name: "Khong Quoc Toan 04", Mobile: "0933961912", Phone: "", Email: '', Address: '' },
    ];
  }
  private extractData(res : Response){
    let body = res.json();
    return body || {};
  }
  getCustomers(link : string): Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(link,headers,options)
      .map(this.extractData)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getAll() {
    let body = { 'mobiles': ['101', '102'], startDate : '2017-01-01', endDate : '', callType :'in' };
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON

    //Post tham so dang link get
    // let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    // let body = 'mobiles[]=101&mobiles[]=101&startDate=2017-01-01&endDate&callType';

    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this._api_getAllCustomers, body, options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // getById(id: number) {
  //   return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  // }

  // create(user: Customer) {
  //   return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
  // }

  // update(user: Customer) {
  //   return this.http.put('/api/users/' + user.Id, user, this.jwt()).map((response: Response) => response.json());
  // }

  // delete(id: number) {
  //   return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  // }

  // // private helper methods

  // private jwt() {
  //   // create authorization header with jwt token
  //   let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //   if (currentUser && currentUser.token) {
  //     let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
  //     return new RequestOptions({ headers: headers });
  //   }
  // }

}
