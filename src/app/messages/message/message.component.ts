import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { MessageService } from '../../_services/message.service';
import { Router } from '@angular/router';
import { AccountService } from '../../_services/account.service';

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

  constructor(private messageService:MessageService, private router:Router, private accountService: AccountService){}

  ngOnInit(): void {
    this.currentUser = this.accountService.getCurrentUser()!;
    this.searchUser();  
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

}
