import {Component, ChangeDetectionStrategy, forwardRef} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validator,
  ValidationErrors,
  AbstractControl,
  NG_VALIDATORS,
} from '@angular/forms';

const DURATION_LENGTH_TEMPLATE_REGEX = /^[0-9]+$/;

@Component({
  selector: 'app-course-edit-length-control',
  templateUrl: './length-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LengthControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LengthControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LengthControlComponent implements ControlValueAccessor, Validator {
  private lengthValue: string;
  private isInvalid: boolean;
  private propagateChange = (_: any) => { };
  private propagateTouch = (_: any) => { };

  private onInput ($event: any) {
    const sourceValue: string = $event.target.value;

    this.isInvalid = !sourceValue.match(DURATION_LENGTH_TEMPLATE_REGEX);

    this.propagateChange(this.lengthValue);
    this.propagateTouch(this.lengthValue);
  }

  public validate(control: AbstractControl): ValidationErrors {
    return this.isInvalid ? {datePeriod: 'Length invalid'} : null;
  }

  public registerOnValidatorChange?(fn: () => void): void {}
  public writeValue(obj: string): void {
    this.lengthValue = obj;
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {}
}
