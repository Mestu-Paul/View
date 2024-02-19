import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { UserRecords } from '../../_models/UserRecords';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  userRecords: UserRecords = new UserRecords();
  constructor(public accountService:AccountService){}
  ngOnInit(): void {
    this.accountService.getUserRecords().subscribe({
      next:res => this.userRecords = res,
      error: err => console.log(err)
    })
  }


}
