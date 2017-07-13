import { Injectable } from '@angular/core';
import {Customer} from './customer'

@Injectable()
export class FilterService {
    public cus : Customer[] = [];
    constructor() { }
}