import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat'
})
export class DurationFormatPipe implements PipeTransform {

  transform(duration: number): string {
    const minutes: number | 0 = duration % 60;
    const hours: number | 0 = (duration - minutes) / 60;
    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    } else {
      return `${minutes}min`;
    }
  }

}
