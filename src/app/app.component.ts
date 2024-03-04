import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'View';
  
  
  wsUrl = "wss://localhost:7250/ws";
  private wss!:WebSocket;
  constructor(){
    // service.startConnection();
    // service.onWSMessage((message:any) => {
    //   console.log("message >>>>>>>>>> ",message);
    // });

    // for(let i=0; i<5; i++){
    //   service.sendWSMessage("hello from angular");
    // }
  }
}
