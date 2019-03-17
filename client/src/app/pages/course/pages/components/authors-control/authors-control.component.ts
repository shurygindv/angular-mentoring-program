import {Component, ChangeDetectionStrategy, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, ValidationErrors, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-course-edit-date-period-control',

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePeriodComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePeriodComponent implements ControlValueAccessor, Validator {
  public validate(control: AbstractControl): ValidationErrors {
    throw new Error('Method not implemented.');
  }

  public registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
  public writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }

  public registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }

  public registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }

  public setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
