import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Teacher } from '../_models/Teacher';
import { Observable } from 'rxjs';
import { FilterResponse } from '../_models/FilterResponse';
import { AccountService } from './account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TeacherFilterParameters } from '../_models/TeacherFilterParameters';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = 'https://localhost:7250/api/teacher';
  filterParameters: TeacherFilterParameters = new TeacherFilterParameters();

  teacher:Teacher = new Teacher();

  constructor(private http: HttpClient, private accountService: AccountService, 
    private toastr: ToastrService, private router:Router) { }

  customFilter(filterParameters: TeacherFilterParameters):Observable<HttpResponse<FilterResponse<Teacher>>>{
    let params = new HttpParams();
    if(filterParameters.gender)
      params = params.append("gender", filterParameters.gender);
    if(filterParameters.department)
      params = params.append("department", filterParameters.department);
    if(filterParameters.education)
      params = params.append("education", filterParameters.education);
    if(filterParameters.research)
      params = params.append("research", filterParameters.research);
    if(filterParameters.pageNumber)
      params = params.append("pageNumber", filterParameters.pageNumber);

    const url = `${this.apiUrl}/filter`;
    return this.http.get<FilterResponse<Teacher>>(url, { observe: 'response', params});
  }

  setTeacher(teacher:Teacher){
    this.teacher = teacher;
  }

  getTeacher(){
    return this.teacher;
  }

  update(teacher:Teacher,username:string){
    return this.http.put(`${this.apiUrl}/update?username=${username}`,teacher);
  }


}
