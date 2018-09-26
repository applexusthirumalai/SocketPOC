import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

//const config: SocketIoConfig = { url: 'http://localhost:3000', options:{}};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule/*,
    SocketIoModule.forRoot(config)*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
