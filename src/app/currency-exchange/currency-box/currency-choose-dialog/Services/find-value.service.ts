import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FindValueService {

  constructor() { }

  findElements = {};

  public find(inputValue: string, data: object) {
    this.findElements = {};
    for (const [key, value] of Object.entries(data)) {
      if (key.includes(inputValue.toUpperCase())) {
        this.findElements[key] = value;
      }
    }
    return this.findElements;
  }
}
