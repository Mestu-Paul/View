import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FilterParameters } from '../_models/FilterParameters';
import { FilterResponse } from '../_models/FilterResponse';
import { StudentFrom } from '../_models/StudentForm';
import { AccountService } from './account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})


export class StudentService {

  private apiUrl = 'https://localhost:7250/api/student';
  filterParameters: FilterParameters = new FilterParameters();
  updateStudentInfo = {
    formFields: new StudentFrom(),
    updateStatus: false
  }

  constructor(private http: HttpClient, private accountService: AccountService, 
    private toastr: ToastrService, private router:Router) { }

  setFilterParameters(filterParameters: FilterParameters){
    this.filterParameters = filterParameters;
  }

  getFilterParameters(){
    return this.filterParameters;
  }

  setFormFields(formFields: StudentFrom){
    this.updateStudentInfo['formFields'] = formFields;
    this.updateStudentInfo['updateStatus'] = true;
  }

  getFormFields(){
    return this.updateStudentInfo;
  }

  resetFormFields(){
    this.updateStudentInfo['formFields'] = new StudentFrom();
    this.updateStudentInfo['updateStatus'] = false;
  };

  customFilter(filterParameters: FilterParameters):Observable<HttpResponse<FilterResponse<StudentFrom>>>{
    let params = new HttpParams();
    if(filterParameters.gender)
      params = params.append("gender", filterParameters.gender);
    if(filterParameters.department)
      params = params.append("department", filterParameters.department);
    if(filterParameters.session)
      params = params.append("session", filterParameters.session);
    if(filterParameters.bloodGroup)
      params = params.append("bloodGroup", filterParameters.bloodGroup);
    if(filterParameters.pageNumber)
      params = params.append("pageNumber", filterParameters.pageNumber);

    // var user = this.accountService.getCurrentUser();
    // if(!user){
    //   this.toastr.error("You are unauthorized");
    //   this.router.navigateByUrl('/login');
      
    // }

    // const header = new HttpHeaders().set('Authorization',`Bearer ${user?.token}`);

    const url = `${this.apiUrl}/filter`;
    return this.http.get<FilterResponse<StudentFrom>>(url, { observe: 'response', params});
  }

  create(studentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, studentData);
  }

  delete(studentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${studentId}`, { observe: 'response', responseType: 'text' });
  }

  update(updatedData: StudentFrom): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${updatedData.id}`, updatedData,{ observe: 'response', responseType: 'text' });
  }

  partialUpdate(id:string, updatedData: any){
    return this.http.patch(`${this.apiUrl}/partialUpdate/${id}`, updatedData);
  }


}
