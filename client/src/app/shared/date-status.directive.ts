import {Directive, Input, HostBinding} from '@angular/core';

@Directive({
  selector: '[appDateStatus]',
})
export class DateStatusDirective {
  @HostBinding('class.box') public box = true;

  @HostBinding('class.box--green') public isActive: boolean;
  @HostBinding('class.box--violet') public get isInactive(): boolean {
    return !this.isActive;
  }

  private isUpToDate(original: number, now: number): boolean {
    return original < now && original >= now - get14Days();
  }

  private isNextDate(original: number, now: number): boolean {
    return original > now;
  }

  private setActive(isActive: boolean): void {
    this.isActive = isActive;
  }

  @Input() set appDateStatus(creationDate: string) {
    const original: number = Number(new Date(creationDate));
    const now: number = Date.now();

    this.setActive(
      this.isUpToDate(original, now) || this.isNextDate(original, now),
    );
  }
}

function get14Days(): number {
  const ONE_SECOND = 1000; // when type :number, tslint says about error "type number trivially inferred from a number"
  const ONE_MINUTE = ONE_SECOND * 60;
  const ONE_HOUR = ONE_MINUTE * 60;
  const ONE_DAY = ONE_HOUR * 24;

  return ONE_DAY * 14;
}
