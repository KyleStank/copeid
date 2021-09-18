import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { SnackBarModule } from './snackbar.module';

@Injectable({ providedIn: SnackBarModule })
export class SnackBarService {
  private _snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

  constructor(private readonly _snackBar: MatSnackBar) {}

  open(message: string, options?: { action?: string; duration?: number; }): void {
    options = {
      action: options?.action ?? undefined,
      duration: options?.duration ?? 3000
    };

    this._snackBarRef = this._snackBar.open(message, options.action, {
      duration: options.duration
    });
  }

  close(closeWithAction = true): void {
    if (!!this._snackBarRef) {
      if (closeWithAction) this._snackBarRef.dismissWithAction();
      else this._snackBarRef.dismiss();
    }
  }
}
