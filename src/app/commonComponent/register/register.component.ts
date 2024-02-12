import { Component } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_models/User';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user:any = {role:'student',username:'',password:''};
  confirmPassword:string = '';

  passwordType="password";

  constructor(private accountService: AccountService, private toastr:ToastrService, private router: Router){}
  ngOnInit(): void {
  }

  register(){
    if(this.user.password !==this.confirmPassword){
      this.toastr.error("Password missmatched with confirm password");
      return;
    }
    if(this.user.username.length===0 || this.user.role.length===0 || this.user.password.length===0){
      this.toastr.error("Field can not be empty");
      return;
    }

    this.accountService.register(this.user).subscribe({
      next: res => {
        this.toastr.success("Your registration successfully completed, Login here");
        this.router.navigateByUrl("/login");
      },
      error: error =>{
        this.toastr.error(error.error);
        console.log("error => ",error);
      }
    })
  }

  togglePassword(){
    if(this.passwordType==='text')this.passwordType='password';
    else this.passwordType='text';
  }
}
