import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { SnackBarModule } from './snackbar.module';

@Injectable({ providedIn: SnackBarModule })
export class SnackBarService {
  constructor(private readonly _snackBar: MatSnackBar) {}

  open(message: string, options?: { action?: string; duration?: number; }): MatSnackBarRef<TextOnlySnackBar> {
    options = {
      action: options?.action ?? undefined,
      duration: options?.duration ?? 3000
    };

    return this._snackBar.open(message, options.action, {
      duration: options.duration
    });
  }
}
