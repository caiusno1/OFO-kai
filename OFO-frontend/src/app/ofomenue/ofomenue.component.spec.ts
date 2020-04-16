import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OFOMenueComponent } from './ofomenue.component';

describe('OFOMenueComponent', () => {
  let component: OFOMenueComponent;
  let fixture: ComponentFixture<OFOMenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OFOMenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OFOMenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
