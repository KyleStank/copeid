import { ActivatedRouteSnapshot } from '@angular/router';
import { merge } from 'lodash-es';

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

