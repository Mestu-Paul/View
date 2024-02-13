import { Component } from '@angular/core';
import { MessageService } from './_services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'View';
  // constructor(private service:MessageService){
  //   service.startConnection();
  //   service.onWSMessage((message:any) => {
  //     console.log("message >>>>>>>>>> ",message);
  //   });

  //   for(let i=0; i<5; i++){
  //     service.sendWSMessage("hello from angular");
  //   }
  // }
}
