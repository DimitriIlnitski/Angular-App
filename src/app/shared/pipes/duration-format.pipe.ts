import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'durationFormat',
})
export class DurationFormatPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(duration: number): string {
    const minutes: number = duration % 60;
    const hours: number = (duration - minutes) / 60;
  
    const translatedMin = this.translate.instant('PIPE.MIN');
    const translatedHour = this.translate.instant('PIPE.HOUR');
    return hours > 0
      ? `${hours}${translatedHour} ${minutes}${translatedMin}`
      : `${minutes}${translatedMin}`;
  }
}
