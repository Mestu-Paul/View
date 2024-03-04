import { Component } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MessageService } from '../../_services/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  loggedIn=false;
  unreadMessageCount=0;
  constructor(public accountService:AccountService, private toastr:ToastrService,
    private router:Router, private messageService:MessageService){
    this.loggedIn = this.accountService.getCurrentUser()?true:false;

    this.updateUnreadMessageCount();
  }

  logout(){
    this.accountService.logOut();
  }

  updateUnreadMessageCount(){
    this.messageService.unreadMessageCountThread$.subscribe({
      next: res => {
        this.unreadMessageCount = 0;
        res.forEach(element => {
          this.unreadMessageCount += element.unreadMessageCount;
        });
      },
      error: err => console.log(err)
    })
  }


}
