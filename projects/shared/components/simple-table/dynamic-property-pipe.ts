import { Pipe, PipeTransform } from '@angular/core';

import { recursivePropertySearch } from '@shared/utils';

@Pipe({
  name: 'dynamicProperty'
})
export class DynamicPropertyPipe implements PipeTransform {
  transform(value: any, property: string): any {
    return recursivePropertySearch(value, property);
  }
}
