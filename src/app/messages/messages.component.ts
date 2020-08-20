import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // messageService is public so that it can be bound in the html template
  // only public components can be bound w angular
  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}
