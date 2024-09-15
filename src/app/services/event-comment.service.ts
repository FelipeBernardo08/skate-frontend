import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventCommentService {

  public eventEmitter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  sendComment(): void {
    this.eventEmitter.emit();
  }
}
