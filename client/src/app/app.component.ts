import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userName : string = '';
  title = 'Socket POC';
  private url = 'http://localhost:3000';
  private socket;    
  constructor() {
      this.socket = io(this.url);
  }
  
  ngOnInit() {
    this.socket.on('pushMsg', (data) => {
      alert(data.msg);
    });
  }

  registerUser(event) {
    event.preventDefault();  
    this.socket.emit('join',{"email":this.userName});
  }

}
