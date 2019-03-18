import {Component, forwardRef} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validator,
  ValidationErrors,
  AbstractControl,
  NG_VALIDATORS,
} from '@angular/forms';

const DATE_TEMPLATE_REGEX = /^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$/;

@Component({
  selector: 'app-course-edit-date-period-control',
  templateUrl: './date-period.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePeriodComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatePeriodComponent),
      multi: true,
    },
  ],
})
export class DatePeriodComponent implements ControlValueAccessor, Validator {
  private datePeriod: string;
  private isInvalid: boolean;
  private propagateChange = (_: any) => { };
  private propagateTouch = (_: any) => { };

  private onInput ($event: any) {
    const sourceValue: string = $event.target.value;

    this.isInvalid = !sourceValue.match(DATE_TEMPLATE_REGEX);

    this.propagateChange(sourceValue);
    this.propagateTouch(sourceValue);
  }

  public validate(control: AbstractControl): ValidationErrors {
    return this.isInvalid ? {datePeriodError: 'Date invalid'} : null;
  }

  public writeValue(obj: string): void {
    this.datePeriod = obj;
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {}
  public registerOnValidatorChange?(fn: () => void): void {}
}
