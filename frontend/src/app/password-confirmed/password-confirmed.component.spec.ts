import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordConfirmedComponent } from './password-confirmed.component';

describe('PasswordConfirmedComponent', () => {
  let component: PasswordConfirmedComponent;
  let fixture: ComponentFixture<PasswordConfirmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordConfirmedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
