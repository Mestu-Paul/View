import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  initiate:boolean = false;
  receiverUsername:string='';
  senderUsername:string="";
  content:string="";

  messages:Message[] = [];

  constructor(private accountService:AccountService, private toastr:ToastrService, private messageService:MessageService){
    
  }
  ngOnInit(): void {
    if(this.accountService.getCurrentUser()===null){
      this.toastr.error("You are not permitted");
      return;
    }
    this.senderUsername = this.accountService.getCurrentUser()!.username;

    this.messageService.messageRequestDetails.subscribe({
      next: details =>{
        console.log(details);
        this.receiverUsername = details.receiverName;
        this.senderUsername = details.senderName;
        if(this.receiverUsername && this.senderUsername){
          this.loadMessages();
          this.initiate=true;
        }
      },
      error: error =>{
        console.log(error);
      }
    })
  }

  loadMessages(){
    this.messageService.getMessages(this.senderUsername,this.receiverUsername,1).subscribe({
      next : res =>{
        console.log(res);
        this.messages = res;
      },
      error: error =>{
        console.log(error);
      }
    })
  }

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

}



