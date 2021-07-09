import { ActivatedRouteSnapshot } from '@angular/router';
import { merge } from 'lodash-es';

/**
 * Takes a root snapshot's route data and then recursively traverses the children of the snapshot.
 * Merges each child snapshot data into one final data object.
 *
 * @param snapshot Root snapshot to traverse.
 * @param data Data object. Generally should be left blank.
 * @returns Merged data object containing all route data.
 */
export function getSnapshotDataRecursive(snapshot: ActivatedRouteSnapshot, data: any = {}): any {
  data = merge(data, snapshot.data);
  snapshot.children.forEach(c => data = getSnapshotDataRecursive(c, data));
  return data;
}
