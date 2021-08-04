import { ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { setBlockType } from 'prosemirror-commands';
import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Editor, toDoc, toHTML, Toolbar } from 'ngx-editor';
import { isNodeActive } from 'ngx-editor/helpers';

import { Reference } from '@app/features';

export interface ReferenceEditDialogData {
  title: string;
  model: Reference;
}

@Component({
  selector: 'app-admin-reference-edit-modal',
  template: `
    <div mat-dialog-title>
      <h2>{{ data?.title }}</h2>
    </div>
    <div class="py-2" mat-dialog-content>
      <div class="row">
        <div class="col-md-auto">
          <!-- <ngx-editor
            [editor]="editor"
            [ngModel]="html"
          ></ngx-editor> -->

          <form [formGroup]="formGroup">
            <div class="NgxEditor__Wrapper">
              <ngx-editor-menu [editor]="editor" [toolbar]="toolbar" [customMenuRef]="customMenu"></ngx-editor-menu>
              <ng-template #customMenu>
                <app-editor-menu [editor]="editor"></app-editor-menu>
              </ng-template>
              <ngx-editor [editor]="editor" formControlName="content"></ngx-editor>
            </div>
          </form>

          <mat-form-field class="w-100" appearance="fill">
            <mat-label>Content</mat-label>

            <input
              #contentInput
              matInput
              required
              type="text"
              aria-label="Reference content text input."
              [(ngModel)]="model.content"
            />

            <mat-error>
              Field is required.
            </mat-error>
          </mat-form-field>
        </div>
      </div>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button color="warn" [mat-dialog-close]="null">Cancel</button>
      <button
        mat-raised-button
        color="primary"
        [disabled]="contentInput.value?.length === 0"
        [mat-dialog-close]="model"
      >
        Save
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReferenceEditModal implements OnInit, OnDestroy {
  readonly editor: Editor = new Editor();
  readonly toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike']
  ];

  html = '';
  formGroup!: FormGroup;

  model: Reference;

  constructor(
    public readonly dialogRef: MatDialogRef<AdminReferenceEditModal>,
    @Inject(MAT_DIALOG_DATA) @Optional() public readonly data?: ReferenceEditDialogData
  ) {
    this.model = {
      ...(data?.model || {}),
      id: data?.model?.id || null,
      content: data?.model?.content || ''
    };

    this.formGroup = new FormGroup({
      content: new FormControl('')
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}

// TODO: Put elsewhere.
@Component({
  selector: 'app-editor-menu',
  template: `
    <div class="NgxEditor__Seperator"></div>
    <div
      class="NgxEditor__MenuItem NgxEditor__MenuItem--Text"
      (mousedown)="onClick($event)"
      [ngClass]="{'NgxEditor__MenuItem--Active': isActive, 'NgxEditor--Disabled': isDisabled}"
    >
      CodeMirror
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorMenuComponent implements OnInit {
  @Input()
  editor?: Editor;

  isActive = false;
  isDisabled = false;

  ngOnInit(): void {
    if (this.editor) {
      const plugin = new Plugin({
        key: new PluginKey('custom-menu-text'),
        view: () => {
          return {
            update: this.update.bind(this)
          }
        }
      });

      this.editor.registerPlugin(plugin);
    }
  }

  onClick(e: MouseEvent): void {
    e.preventDefault();
    if (this.editor) {
      const view = this.editor.view;
      this.execute(view.state, view.dispatch);
    }
  }

  execute(state: EditorState, dispatch?: (tr: Transaction) => void): boolean {
    const schema = state.schema;

    console.log('Schema:', schema);
    console.log('Is Active?', this.isActive);

    if (this.isActive) {
      return setBlockType(schema.nodes.paragraph)(state, dispatch);
    }

    return setBlockType(schema.nodes.text)(state, dispatch);
  }

  update(view: EditorView): void {
    const state = view.state;
    const schema = state.schema;
    this.isActive = isNodeActive(state, schema.nodes.text);
    this.isDisabled = !this.execute(state, undefined); // Returns true if executable.
  }
}
