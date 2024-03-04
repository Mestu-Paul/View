import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_models/User';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  users:User[] = [];
  changeRole:boolean = false;
  updateData:any = {username:'', role:''};

  pageNumber:number=1;
  totalPages:number=1;

  constructor(public accountService:AccountService, private toastr: ToastrService, private router:Router){}
  ngOnInit(): void {
    if(this.accountService.getCurrentUser()===null){
      this.toastr.error("You are not permitted");
      this.router.navigateByUrl("/");
      return;
    }

    var role = this.accountService.getCurrentUser()?.role;
    if(role!=='admin'){
      this.toastr.error("You are not permitted");
      this.router.navigateByUrl(`/${role}s`);
    }

    this.loadUsers();
  }

  loadUsers(pageNumber:number=1){
    this.accountService.getUsers(pageNumber).subscribe({
      next: data => {
        if (data) {
            this.users = data.item1;
            this.totalPages = data.item2;
        }
      },
      error: error => {
        console.log(error);
      }
    })
  }

  OnChange(username:string, role: string){
    this.updateData.username = username;
    this.updateData.role = role;
    this.changeRole = true;
  }

  update(){
    this.accountService.updateRole(this.updateData).subscribe({
      next: res => {
        this.toastr.success("Role updated");
      },
      error: error =>{
        console.log(error);
      }
    });
    this.changeRole=false;
  }

  deleteUser(username:string){
    this.accountService.deleteUser(username).subscribe({
      next: res => {
        this.toastr.success("User deleted");
        this.loadUsers();
      },
      error: error =>{
        console.log(error);
        this.toastr.error(error.error);
      }
    })
  }
}
