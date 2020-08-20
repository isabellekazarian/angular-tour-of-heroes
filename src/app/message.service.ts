import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class MessageService {

  // create message cache once
  messages: string[] = [];

  // add message to cache
  add(message: string) {
    this.messages.push(message);
  }

  // clear message cache
  clear() {
    this.messages = [];
  }
}