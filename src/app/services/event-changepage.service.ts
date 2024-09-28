import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventChangepageService {

  public eventEmitter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  changePage(): void {
    this.eventEmitter.emit();
  }
}
