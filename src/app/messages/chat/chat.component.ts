import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/Message';
import { take } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  initiate:boolean = false;
  receiverUsername:string='peter';
  senderUsername:string="";
  content:string="";

  messages:Message[] = [];

  constructor(private accountService:AccountService, private toastr:ToastrService, public messageService:MessageService){
    
  }
  ngOnInit(): void {
    if(this.accountService.getCurrentUser()===null){
      this.toastr.error("You are not permitted");
      return;
    }
    this.senderUsername = this.accountService.getCurrentUser()!.username;

    this.messageService.messageRequestDetails$.subscribe({
      next: details =>{
        console.log(details);
        this.receiverUsername = details.receiverName;
        this.senderUsername = details.senderName;
        if(this.receiverUsername && this.senderUsername){
          // this.loadMessages();
          this.initiate=true;
        }
      },
      error: error =>{
        console.log(error);
      }
    });

    this.updateMessages();
    this.receivedMessage();
  }

  // loadMessages(){
  //   this.messageService.getMessages(this.senderUsername,this.receiverUsername,1).subscribe({
  //     next : res =>{
  //       console.log(res);
  //       this.messages = res;
  //     },
  //     error: error =>{
  //       console.log(error);
  //     }
  //   })
  // }

  sendMessage(){
    const curMessage: Message ={
      senderUsername: this.senderUsername,
      recipientname: this.receiverUsername,
      content: this.content
    };

    this.messageService.sendMessage(curMessage).subscribe({
      next: res => {
        this.messages.push(curMessage);
      },
      error: error =>{
        console.log(error);
      }
    })
    this.content='';
  }

  receivedMessage(){
    this.messageService.onWSMessage((message:any)=>{
      console.log(message);
      const newMessage:Message = {
        senderUsername: message.SenderUsername,
        recipientname: message.Recipientname,
        content: message.Content 
      }
      this.messages.push(newMessage);
    });
  }

  updateMessages(){
    this.messageService.messageThread$.subscribe({
      next: messages =>{
        this.messages = messages;
        console.log("Updated messages:", this.messages);
      }
    })
  }

}



