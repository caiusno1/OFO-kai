import { Participant } from './Participants';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'participants2View'
})
export class Participants2ViewPipe implements PipeTransform {

  transform(value: Participant[]): string {
    if (!value){
      return '';
    }
    return value.map((item) => item.name).join(', ');
  }

}
