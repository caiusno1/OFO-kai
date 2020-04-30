/**
 * A directive for managing the freetime configuration bars to set the freetime the user has on the respetive day
 */

import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Directive({
  selector: '[appCalendarBlock]',
})
export class CalendarBlockDirective{
  private yCord: number;

  // Visualize an freetime clocktime given by string
  @Input('appCalendarBlock')
  set timeString(val: string){
    this._timeString = val;
    const maxheight = this.el.nativeElement.parentNode.offsetHeight;
    const hourMinuteSplited = val.split(':');
    // set the y position to the sourrounding box according to the actual clocktime relative to the latest clocktime
    this.yCord = maxheight * (Number.parseInt(hourMinuteSplited[0], 10) + Number.parseInt(hourMinuteSplited[1], 10) / 60) / 24;
    this.el.nativeElement.style.transform = `translate3d(0px, ${this.yCord}px, 0px)`;
    this.el.nativeElement.textContent = this._timeString;
  }
  // Inform if the freetime clocktime has changed as output parameter to make it bindable in the angular template
  // tslint:disable-next-line:no-output-rename
  @Output('onTimeChanged')
  public timeStringChanged = new EventEmitter<string>();
  // tslint:disable-next-line:variable-name
  private _timeString: string;

  // transform the visualized drag of this bar to an internal value (the actual clocktime) and visualize
  @HostListener('cdkDragMoved', ['$event'])
  changeTime(event){
    const maxheight = this.el.nativeElement.parentNode.offsetHeight;
    const transformstring = this.el.nativeElement.style.transform as string;

    // use regex here because transform (which also describes the relative postion)
    // can hold other properties and multiple relative postion transformations
    // the position transforms have to be composed first before calculating the relative time in relation to the relative position
    const translateRegex = /translate3d\(\s*[-+0-9.]*\s*px\s*\,\s*([-+0-9.]*)px\s*\,\s*[-+0-9.]*px\s*\)/gm;
    const translateRegexNotGlobal = /translate3d\(\s*[-+0-9.]*\s*px\s*\,\s*([-+0-9.]*)px\s*\,\s*[-+0-9.]*px\s*\)/m;
    let calcYCord  = 0;
    let count = 0;
    for ( const translate of transformstring.match(translateRegex)){
      const yMatch = translateRegexNotGlobal.exec(translate);
      if ( yMatch && yMatch.length > 1){
        calcYCord += Number.parseFloat(yMatch[1]);
      }
      count ++;
    }
    this.yCord = calcYCord;
    if (count > 1){ // only if we had to compose multiple transforms set it to one composed (in the css) for better handling
      // set the y position to the sourrounding box according to the actual clocktime relative to the latest clocktime
      this.el.nativeElement.style.transform = `translate3d(0px, ${this.yCord}px, 0px)`;
    }
    // calculated the actual time string
    const time = 24 * (this.yCord / (maxheight - 25));
    const timeh = Math.trunc(time);
    let timem = Math.trunc(60 * (time - timeh));
    // Round to 5 minutes (e.g. 5:42 => 5:45)
    timem -= timem % 5 ;
    this._timeString = `${(timeh < 10) ? ('0' + timeh) : timeh}:${(timem < 10) ? ('0' + timem) : timem}`;
    // Set the string to the UI
    this.el.nativeElement.textContent = this._timeString;
  }
  // Inform of a new clocktime value only when the user released the configuration bar (to which this directive is attached)
  @HostListener('cdkDragReleased', ['$event'])
  timeFixed(event) {
    this.timeStringChanged.emit(this._timeString);
  }
  constructor(private el: ElementRef) {
    this.yCord = 0;
  }

}
