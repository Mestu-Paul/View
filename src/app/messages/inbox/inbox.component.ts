import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { StudentService } from '../../_services/student.service';
import { TeacherService } from '../../_services/teacher.service';
import { User } from '../../_models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherFilterParameters } from '../../_models/TeacherFilterParameters';
import { MessageService } from '../../_services/message.service';
import { ChatList, Recipient } from '../../_models/chatList';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css'
})
export class InboxComponent implements OnInit{
  chatList : ChatList = new ChatList;

  currentRecipientUsername: string = '';

  newRecipientUsername:string='';

  currentUser: User = {} as User;
  constructor(private accountService:AccountService, private router:Router,
    public messageService:MessageService, private route: ActivatedRoute){

  }
  ngOnInit(): void {
    if(this.accountService.getCurrentUser()){
      this.currentUser = this.accountService.getCurrentUser()!;
    }
    else{
      this.router.navigateByUrl("/");
      return;
    }
    
    this.loadChatList();
    this.extractQueryParams();    
  }

  extractQueryParams(){
    this.route.queryParams.subscribe(params => {
      const index = this.chatList.recipientUsername.findIndex(recipient => recipient.username === params["recipientUsername"]);
      if(index===-1){
        this.newRecipientUsername = params["recipientUsername"];
        if(this.newRecipientUsername){
          this.currentRecipientUsername = this.newRecipientUsername;
          this.showChat(this.currentRecipientUsername);
        }
      }
      else{
        this.showChat(params["recipientUsername"]);
      }
    })
  }

  loadChatList(){
    this.messageService.getChatList(this.currentUser.username);
    this.messageService.inboxThread$.subscribe({
      next: list => {
        this.chatList = list;
      },
      error: error =>{
        console.log("error while updating list ",error);
      }
    })
  }

  navigateToChat(recipientUsername:string){
    this.router.navigate(['/messages/inbox'], { queryParams: { recipientUsername: recipientUsername } });
  }

  showChat(receiverName:string){
    if(this.newRecipientUsername!==receiverName){
      this.newRecipientUsername = '';
    }
    this.currentRecipientUsername = receiverName;
    this.messageService.setMessageRequestDetails({senderName:this.currentUser.username, receiverName:receiverName});
  }
}
