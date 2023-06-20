import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat',
})
export class DurationFormatPipe implements PipeTransform {
  transform(duration: number): string {
    const minutes: number = duration % 60;
    const hours: number = (duration - minutes) / 60;
    return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
  }
}
