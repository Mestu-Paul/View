import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { User } from '../_models/User';
import { AuthToken } from '../_models/AuthToken';
import { UserRecords } from '../_models/UserRecords';


@Injectable({
  providedIn: 'root'
})

export class AccountService {

  baseUrl = "https://localhost:7250/api/Account/";
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  user: User = {} as User;
  
  constructor(private http: HttpClient, private router:Router, private toastr:ToastrService) { }

  login(model:any){
    return this.http.post<AuthToken>(this.baseUrl + "login", model).subscribe({
      next: response => {
        this.decodeJwtToken(response.accessToken);
        this.toastr.success("You are logged in");
      },
      error: error => {
        console.log(error)
        if(error.statusText=="Unknown Error"){
          this.toastr.error("Can not connect with server");
          return;
        }
        this.toastr.error(error.error);
      }
    })
  }

  decodeJwtToken(token: string) {
    try {
      var decodedToken = JSON.parse(JSON.stringify(jwtDecode(token)));
      
      this.user.role = decodedToken['role'];
      this.user.username = decodedToken['name'];
      this.user.token = token;
      this.setCurrentUser(this.user);
      if(this.user.role==='admin')this.router.navigateByUrl('/admin-dashboard');
      else this.router.navigateByUrl(`/${this.user.role}s`)
    } catch (error) {
      console.error('Error decoding JWT:', error);
    }
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

  getUsers(pageNumber: number = 1): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}users/filtered?pageNumber=${pageNumber}`);
}

  updateRole(updateData:any){
    return this.http.put(this.baseUrl+'updateRole',updateData);
  }

  deleteUser(username:string){
    return this.http.delete(`${this.baseUrl}delete/${username}`);
  }

  isLoggedIn():boolean{
    if(this.getCurrentUser()){
      return true;
    }
    return false;
  }

  getUserRecords(){
    return this.http.get<UserRecords>(this.baseUrl+"userRecords");
  }
}
