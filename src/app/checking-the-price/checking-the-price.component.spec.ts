import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckingThePriceComponent } from './checking-the-price.component';

describe('CheckingThePriceComponent', () => {
  let component: CheckingThePriceComponent;
  let fixture: ComponentFixture<CheckingThePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckingThePriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckingThePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
