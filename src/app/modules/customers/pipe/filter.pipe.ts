import { Pipe, PipeTransform } from '@angular/core';

import { Customer } from '../customer';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
  transform(items: Customer[], filter: Customer): Customer[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Customer) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Customer} Customer The Customer to compare to the filter.
   * @param {Customer} filter The filter to apply.
   * @return {boolean} True if Customer satisfies filters, false if not.
   */
  applyFilter(Customer: Customer, filter: Customer): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (Customer[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (Customer[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}