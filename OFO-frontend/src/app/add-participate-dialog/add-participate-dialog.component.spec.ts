import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParticipateDialogComponent } from './add-participate-dialog.component';

describe('AddParticipateDialogComponent', () => {
  let component: AddParticipateDialogComponent;
  let fixture: ComponentFixture<AddParticipateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParticipateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParticipateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
