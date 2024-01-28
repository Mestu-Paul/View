import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  model:any = {username:'', password:''};

  passwordType="password";

  constructor(private accountService: AccountService){}
  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model);
  }

  logout(){
    this.accountService.logOut();
  }

  togglePassword(){
    if(this.passwordType==='text')this.passwordType='password';
    else this.passwordType='text';
  }



}
