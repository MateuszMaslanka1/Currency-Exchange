import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyBoxComponent } from './currency-box.component';

describe('CurrencyBoxComponent', () => {
  let component: CurrencyBoxComponent;
  let fixture: ComponentFixture<CurrencyBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
