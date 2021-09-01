import { Injector, Pipe, PipeTransform, Type } from '@angular/core';

import { AutoPipe } from '../models/pipe.model';

/**
 * @description
 * Allows pipes to be chained together from an array.
 * Relays an array of `AutoPropertyPipe`, which is an interface for a pipe and arguments, through the transform and returns the final value.
 */
@Pipe({ name: 'autoDynamicPipe' })
export class AutoDynamicPipe implements PipeTransform {
  constructor(private _injector: Injector) {}

  /**
   * @description
   * Invokes the `transform()` function of `PipeTransform` on every item in the `pipes` array.
   * The provided arguments for each item are also passed.
   * The final value of each pipe transform is returned.
   *
   * @param value Value to transform.
   * @param pipes Array of pipes and arguments.
   * @returns Transformed data from every `transform()` function.
   */
  transform(value: any, pipes?: AutoPipe[]): any {
    if (pipes == null || !Array.isArray(pipes) || pipes.length === 0) {
      return value;
    }

    let v = value;
    for (const pipe of pipes) {
      if (pipe == null) {
        continue;
      }

      // Try to get pipe from injector.
      const pipeTransform = this._injector.get(pipe.pipe as Type<PipeTransform>, null);
      if (pipeTransform == null) {
        continue;
      }

      v = pipeTransform.transform(v, ...(pipe.args != null && Array.isArray(pipe.args) ? pipe.args : []));
    }

    return v;
  }
}
