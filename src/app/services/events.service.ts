import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }

  public eventEmitter: EventEmitter<any> = new EventEmitter();

  changeImage(): void {
    this.eventEmitter.emit();
  }
}
