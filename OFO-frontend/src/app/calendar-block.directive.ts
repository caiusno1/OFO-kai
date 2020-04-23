import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Directive({
  selector: '[appCalendarBlock]',
})
export class CalendarBlockDirective{
  private yCord: number;

  @Input('appCalendarBlock')
  set timeString(val: string){
    this._timeString = val;
    const maxheight = this.el.nativeElement.parentNode.offsetHeight;
    const hourMinuteSplited = val.split(':');
    this.yCord = maxheight * (Number.parseInt(hourMinuteSplited[0], 10) + Number.parseInt(hourMinuteSplited[1], 10) / 60) / 24;
    this.el.nativeElement.style.transform = `translate3d(0px, ${this.yCord}px, 0px)`;
    this.el.nativeElement.textContent = this._timeString;
  }
  // tslint:disable-next-line:no-output-rename
  @Output('onTimeChanged')
  public timeStringChanged = new EventEmitter<string>();
  // tslint:disable-next-line:variable-name
  private _timeString: string;
  @HostListener('cdkDragMoved', ['$event'])
  changeTime(event){
    const maxheight = this.el.nativeElement.parentNode.offsetHeight;
    const transformstring = this.el.nativeElement.style.transform as string;
    const translateRegex = /translate3d\(\s*[-+0-9.]*\s*px\s*\,\s*([-+0-9.]*)px\s*\,\s*[-+0-9.]*px\s*\)/gm;
    const translateRegexNotGlobal = /translate3d\(\s*[-+0-9.]*\s*px\s*\,\s*([-+0-9.]*)px\s*\,\s*[-+0-9.]*px\s*\)/m;
    let calcYCord  = 0;
    let count = 0;
    for ( const translate of transformstring.match(translateRegex)){
      let yMatch = translateRegexNotGlobal.exec(translate);
      if ( yMatch && yMatch.length > 1){
        calcYCord += Number.parseFloat(yMatch[1]);
      }
      count ++;
    }
    this.yCord = calcYCord;
    if (count > 1){
      this.el.nativeElement.style.transform = `translate3d(0px, ${this.yCord}px, 0px)`;
    }
    const time = 24 * (this.yCord / (maxheight - 25));
    const timeh = Math.trunc(time);
    let timem = Math.trunc(60 * (time - timeh));
    timem -= timem % 5 ;
    this._timeString = `${(timeh < 10) ? ('0' + timeh) : timeh}:${(timem < 10) ? ('0' + timem) : timem}`
    this.el.nativeElement.textContent = this._timeString;
  }
  @HostListener('cdkDragReleased', ['$event'])
  timeFixed(event) {
    this.timeStringChanged.emit(this._timeString);
  }
  constructor(private el: ElementRef) {
    this.yCord = 0;
  }

}
