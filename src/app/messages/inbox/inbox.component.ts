import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { StudentService } from '../../_services/student.service';
import { TeacherService } from '../../_services/teacher.service';
import { User } from '../../_models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherFilterParameters } from '../../_models/TeacherFilterParameters';
import { MessageService } from '../../_services/message.service';
import { Recipient } from '../../_models/chatList';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css'
})
export class InboxComponent implements OnInit{
  users : Recipient[] = [];

  currentRecipientUsername: string = '';

  newRecipient:string='';

  currentUser: User = {} as User;
  constructor(private accountService:AccountService, private router:Router,
    public messageService:MessageService){

  }
  ngOnInit(): void {
    if(this.accountService.getCurrentUser()){
      this.currentUser = this.accountService.getCurrentUser()!;
    }
    else{
      this.router.navigateByUrl("login");
      return;
    }

    this.messageService.getChatList(this.currentUser.username);
  }

  loadUsers(){
    this.messageService.getChatList(this.currentUser.username);
  }

  showChat(receiverName:string){
    this.currentRecipientUsername = receiverName;
    this.messageService.setMessageRequestDetails({senderName:this.currentUser.username, receiverName:receiverName});
  }
}
