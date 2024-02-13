import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { MessageService } from '../../_services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit{
  users:User[]=[];
  username:string='';
  content:string='';

  constructor(private messageService:MessageService, private router:Router){}

  ngOnInit(): void {
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
    this.router.navigate(['/messages/inbox/chat'], { queryParams: { "recipientUsername": recipientUsername } });
  }

}
