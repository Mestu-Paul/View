import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { MessageService } from '../../_services/message.service';
import { Router } from '@angular/router';
import { AccountService } from '../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { SenderUser } from '../../_models/Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit{
  users:User[]=[];
  username:string='';
  content:string='';
  currentUser:User = {} as User;
  newMessage:SenderUser[] = [];

  constructor(private messageService:MessageService, private router:Router, private accountService: AccountService, private toastr:ToastrService){}

  ngOnInit(): void {
    if(this.accountService.getCurrentUser()===null){
      this.toastr.error("You are not permitted");
      this.router.navigateByUrl("/");
      return;
    }
    this.currentUser = this.accountService.getCurrentUser()!;
    this.searchUser(); 
    this.getNewMessage(); 
  }

  searchUser(){
    this.messageService.searchUsers(this.username).subscribe({
      next: res =>{
        this.users = res;
      },
      error:error =>{
        console.log("Error searching user ",error);
      }
    })
  }

  gotoInbox(recipientUsername:string){
    this.router.navigate(['/messages/inbox'], { queryParams: { "recipientUsername": recipientUsername } });
  }

  getNewMessage(){
    this.messageService.unreadMessageCountThread$.subscribe({
      next: res => {
        this.newMessage = res;
      },
      error: err => console.log(err)
    })
  }

}
