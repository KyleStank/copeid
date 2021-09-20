import { ActivatedRouteSnapshot } from '@angular/router';
import { merge } from 'lodash-es';
import { Observable } from 'rxjs';

/**
 * Takes a root snapshot's route data and then recursively traverses the children of the snapshot.
 * Merges each child snapshot data into one final data object.
 *
 * @param snapshot Root snapshot to traverse.
 * @param data Data object. Generally should be left blank.
 *
 * @returns Merged data object containing all route data.
 */
export function getSnapshotDataRecursive(snapshot: ActivatedRouteSnapshot, data: any = {}): any {
  data = merge(data, snapshot.data);
  snapshot.children.forEach(c => data = getSnapshotDataRecursive(c, data));
  return data;
}

/**
 * Recursive function that is able to search any item for any of its properties, even if they are properties of a property.
 * If the `item` we pass is an object that has a `person` property on it, and we pass `property`
 * as `person.name`, the returned value will be `item['person']['name']`.
 *
 * @param item
 * Base item to search.
 * @param property
 * Property to search for. This should always contain either a single string, such as `person`,
 * or it should contain properties of `item` that are denoted by `seperator`.
 * An example of this would be `person.name`.
 * @param seperator
 * The character used to seperate each property.
 * By default, this is a single `.` character.
 *
 * @returns
 * Value of `property` on `item`. If no property is provided, entire item is returned. If no item is provided, null is returned.
 */
export const recursivePropertySearch = <T = any>(item: T, property: string | undefined, seperator: string = '.'): any => {
  if (item == null) {
    return null;
  }

  if (property == null) {
    return item;
  }

  // Ensure the seperator is a valid value.
  seperator = seperator != null ? seperator : '.';

  // Split property into array.
  const arr = property.split(seperator);

  // If there's only onen item in the array, we are safe to return the item's property value.
  if (arr.length <= 1) {
    return (item as any)[property];
  }

  // Recursively run this function until we have value of the last property in the array.
  return recursivePropertySearch((item as any)[arr[0]], arr.slice(1, arr.length).join(seperator));
};

export const isString = (value: any): boolean => {
  return typeof (value) === 'string' || value instanceof String;
};

export const isNumber = (value: any): boolean => {
  return typeof (value) === 'number' || value instanceof Number;
};

export const isBoolean = (value: any): boolean => {
  return typeof (value) === 'boolean' || value instanceof Boolean;
};

export const isSymbol = (value: any): boolean => {
  return typeof (value) === 'symbol' || value instanceof Symbol;
};

export const isFunction = (value: any): boolean => {
  return typeof (value) === 'function' || value instanceof Function;
};

export const isObject = (value: any, instanceType: any): boolean => {
  return typeof (value) === 'object' && value instanceof instanceType;
};

export const isTypeOf = (value: any, instanceType: any): boolean => {
  if (instanceType === String) return isString(value);
  else if (instanceType === Number) return isNumber(value);
  else if (instanceType === Boolean) return isBoolean(value);
  else if (instanceType === Symbol) return isSymbol(value);
  else if (instanceType === Function) return isFunction(value);
  else if (instanceType === Array) return isObject(value, Array) && Array.isArray(value);
  return isObject(value, instanceType);
};

export const convertFile = (file: File): Observable<string> => {
  return new Observable<string>(sub => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event: ProgressEvent<FileReader>): void => {
      sub.next(btoa(event.target!.result!.toString()));
      sub.complete();
    };

    reader.onerror = (error: ProgressEvent<FileReader>): void => {
      sub.error(error);
      sub.complete();
    };

    reader.onabort = (error: ProgressEvent<FileReader>): void => {
      sub.error(error);
      sub.complete();
    };
  });
};
