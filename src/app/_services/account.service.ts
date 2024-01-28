import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../_models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FilterResponse } from '../_models/FilterResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = "https://localhost:7250/api/Account/";
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private http: HttpClient, private router:Router, private toastr:ToastrService) { }

  login(model:any){
    return this.http.post<User>(this.baseUrl+"login",model).subscribe({
      next: response => {
        this.setCurrentUser(response);
        this.router.navigateByUrl('/');
        this.toastr.success("You are logged in");
      },
      error: error => console.log(error)
    })
  }

  register(model:any){
    return this.http.post(this.baseUrl+"register",model);
  }

  setCurrentUser(user:User){
    localStorage.setItem('user',JSON.stringify(user));
  }

  getCurrentUser(){
    var userString = localStorage.getItem('user');
    if(!userString)return null;
    var user:User = JSON.parse(userString);
    return user;
  }

  logOut(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/login');
  }

  getUsers():Observable<User>{
    const user = this.getCurrentUser()
    const header = new HttpHeaders().set('Authorization', `Bearer ${user?.token}`);
    return this.http.get<User>(this.baseUrl+'users',{headers:header});
  }

  isLoggedIn():boolean{
    if(this.getCurrentUser()){
      return true;
    }
    return false;
  }
}
