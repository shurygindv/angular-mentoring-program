import {Component, forwardRef, Input} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validator,
  ValidationErrors,
  AbstractControl,
  NG_VALIDATORS,
} from '@angular/forms';

@Component({
  selector: 'app-course-edit-authors-control',
  templateUrl: './authors-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorsControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AuthorsControlComponent),
      multi: true,
    },
  ],
})
export class AuthorsControlComponent
  implements ControlValueAccessor, Validator {
  private isInvalid: boolean;

  @Input() public selectedAuthorIds: string[];

  private propagateChange = (_: any) => {};
  private propagateTouch = (_: any) => {};

  private onChange(ids: string[]) {
    this.isInvalid = (ids || []).length === 0;

    this.propagateChange(ids);
    this.propagateTouch(ids);
  }

  public validate(control: AbstractControl): ValidationErrors {
    return this.isInvalid ? {authorControlError: 'Too few authors'} : null;
  }

  public registerOnValidatorChange?(fn: () => void): void {}
  public writeValue(ids: string[]): void {
    this.selectedAuthorIds = ids;
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {}
}
