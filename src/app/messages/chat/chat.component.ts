import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/Message';
import { take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private accountService:AccountService, private toastr:ToastrService, 
    public messageService:MessageService, private route:ActivatedRoute){
    
  }
  ngOnInit(): void {
    if(this.accountService.getCurrentUser()===null){
      this.toastr.error("You are not permitted");
      return;
    }
    this.senderUsername = this.accountService.getCurrentUser()!.username;
    console.log("sender name ",this.senderUsername);

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

    this.route.queryParams.subscribe(params => {
      this.receiverUsername = params["recipientUsername"];
      if(this.receiverUsername && this.accountService.getCurrentUser()){
        this.senderUsername = this.accountService.getCurrentUser()!.username;
        this.loadMessages();
        this.initiate=true
      }
    })

    this.updateMessages();
    this.receivedMessage();
  }

  loadMessages(){
    // console.log("message loading ",this.senderUsername, this.receiverUsername);
    this.messageService.getMessages(this.senderUsername,this.receiverUsername,1);
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



