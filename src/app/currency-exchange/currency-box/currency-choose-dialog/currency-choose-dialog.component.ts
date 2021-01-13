import {Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {FindValueService} from './Services/find-value.service';

@Component({
  selector: 'app-currency-choose-dialog',
  templateUrl: './currency-choose-dialog.component.html',
  styleUrls: ['./currency-choose-dialog.component.scss']
})
export class CurrencyChooseDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CurrencyChooseDialogComponent>, @Inject(MAT_DIALOG_DATA) public data,
              public findValueService: FindValueService) {}

  @ViewChild('searchInput', { static: true }) input: ElementRef;

  dataToView;
  textFormInput: string;

  ngOnInit() {
    this.dataToView = this.data;
    fromEvent<any>(this.input.nativeElement, 'keyup').pipe(
      debounceTime(600),
      distinctUntilChanged()
    ).subscribe(() => {
        const inputValue: string = this.textFormInput;
        this.dataToView = this.findValueService.find(inputValue, this.data);
      }
    );
  }

  getValue(value: {name: string, value: number}) {
    this.dialogRef.close(value);
  }
}
