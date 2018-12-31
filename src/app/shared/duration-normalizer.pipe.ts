import {Pipe, PipeTransform} from '@angular/core';

const formatMinutes = (value: number) => (value ? `${value} min` : '');
const formatHours = (value: number) => (value ? `${value}h` : '');

@Pipe({name: 'durationNormalizer'})
export class DurationNormalizerPipe implements PipeTransform {
  public transform(min: number): string {
    if (min < 60) {
      return formatMinutes(min);
    }

    const hours = Math.round(min / 60);
    const minutes = Math.round(min % 60);

    return `${formatHours(hours)} ${formatMinutes(minutes)}`.trim();
  }
}
