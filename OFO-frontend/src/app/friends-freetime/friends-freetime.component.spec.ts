import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsFreetimeComponent } from './friends-freetime.component';

describe('FriendsFreetimeComponent', () => {
  let component: FriendsFreetimeComponent;
  let fixture: ComponentFixture<FriendsFreetimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsFreetimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsFreetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
