import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MobileMenuComponent } from './page-header/mobile-menu/mobile-menu.component';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyExchangeComponent } from './currency-exchange/currency-exchange.component';

import { PageHeaderComponent } from './page-header/page-header.component';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import { CurrencyBoxComponent } from './currency-exchange/currency-box/currency-box.component';
import { CurrencyChooseDialogComponent } from './currency-exchange/currency-box/currency-choose-dialog/currency-choose-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RatesComponent } from './currency-exchange/rates/rates.component';
import { CheckingThePriceComponent } from './checking-the-price/checking-the-price.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { FirebaseAuthComponent } from './firebase-auth/firebase-auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyExchangeComponent,
    PageHeaderComponent,
    CurrencyBoxComponent,
    CurrencyChooseDialogComponent,
    RatesComponent,
    CheckingThePriceComponent,
    MobileMenuComponent,
    FirebaseAuthComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'firebaseConfig'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  entryComponents: [ CurrencyChooseDialogComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
