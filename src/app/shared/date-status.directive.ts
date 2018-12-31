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

  private setActive(isActive: boolean) {
    console.log(isActive);
    this.isActive = isActive;
  }

  @Input() set appDateStatus(creationDate: string) {
    const original = Number(new Date(creationDate));
    const now = Date.now();

    this.setActive(
      this.isUpToDate(original, now) || this.isNextDate(original, now),
    );
  }
}

function get14Days() {
  const ONE_SECOND = 1000;
  const ONE_MINUTE = ONE_SECOND * 60;
  const ONE_HOURS = ONE_MINUTE * 60;

  return ONE_HOURS * 24 * 14;
}
