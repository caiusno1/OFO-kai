import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCalendarBlock]',
})
export class CalendarBlockDirective {
  private y: number;
  public timeString: string;
  @HostListener('cdkDragMoved', ['$event'])
  changeTime(event){
    const parent = this.el.nativeElement.parentNode;
    const maxheight = parent.offsetHeight;
    const transformstring = this.el.nativeElement.style.transform;
    this.y = transformstring.substring(transformstring.indexOf(',') + 2, transformstring.lastIndexOf(',') - 2);
    const time = 24 * (this.y / (maxheight - 25));
    const timeh = Math.trunc(time);
    let timem = Math.trunc(60 * (time - timeh));
    timem -= timem % 5 ;
    this.timeString = `${(timeh < 10) ? ('0' + timeh) : timeh}:${(timem < 10) ? ('0' + timem) : timem}`
    this.el.nativeElement.textContent = this.timeString;
   }
  constructor(private el: ElementRef) {
    this.y = 0;
  }

}
