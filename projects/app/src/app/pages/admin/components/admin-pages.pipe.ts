import { Pipe, PipeTransform } from '@angular/core';

import { recursivePropertySearch } from '@shared/utils';

@Pipe({
  name: 'adminPropertyValue'
})
export class AdminPropertyValuePipe implements PipeTransform {
  /**
   * @description
   * Returns the value of an object's property.
   *
   * @param value Object that contains property.
   * @param property Property to grab from object.
   * @returns Value of `value[property]`
   */
  transform(value: any, property?: string): any {
    return recursivePropertySearch(value, property);
  }
}
