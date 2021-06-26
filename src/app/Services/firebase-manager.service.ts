import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseManagerService {

  private dbPath = '/purchaseAmount';

  purchaseAmountList: AngularFireList<number>;

  constructor(private db: AngularFireDatabase) {
    this.purchaseAmountList = db.list(this.dbPath);
  }

  getAll(): AngularFireList<number> {
    return this.purchaseAmountList;
  }

  create(amount: number): any {
    return this.purchaseAmountList.push(amount);
  }

  update(key: string, value: any): Promise<void> {
    return this.purchaseAmountList.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.purchaseAmountList.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.purchaseAmountList.remove();
  }
}
