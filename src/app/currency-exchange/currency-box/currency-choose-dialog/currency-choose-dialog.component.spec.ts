import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyChooseDialogComponent } from './currency-choose-dialog.component';

describe('CurrencyChooseDialogComponent', () => {
  let component: CurrencyChooseDialogComponent;
  let fixture: ComponentFixture<CurrencyChooseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyChooseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyChooseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
