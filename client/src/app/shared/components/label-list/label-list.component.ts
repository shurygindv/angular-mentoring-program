import {Component, Input, EventEmitter, Output, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

export interface LabelItem {
  id: string;
  name: string;
}

@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.scss'],
})
export class LabelListComponent {
  @Input() public items: LabelItem[];
  // handlers
  @Output() public add = new EventEmitter<string>();
  @Output() public remove = new EventEmitter<string>();

  public labelGroupForm: FormGroup;

  constructor() {
    this.labelGroupForm = this.createLabelGroupForm();
  }

  get form(): FormGroup {
    return this.labelGroupForm;
  }

  get value(): string {
    return this.form.controls.labelValue.value;
  }

  private createLabelGroupForm(): FormGroup {
    return new FormGroup({
      labelValue: new FormControl(''),
    });
  }

  public onSubmit() {
    this.add.emit(this.value);
  }

  public onRemove(item: LabelItem) {
    this.remove.emit(item.id);
  }
}
