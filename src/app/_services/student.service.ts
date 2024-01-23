import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FilterParameters } from '../_models/FilterParameters';
import { FilterResponse } from '../_models/FilterResponse';
import { StudentFrom } from '../_models/StudentForm';


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

  constructor(private http: HttpClient) { }

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

  customFilter(filterParameters: FilterParameters): Observable<FilterResponse> {
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

    const url = `${this.apiUrl}/filter`;
    return this.http.get<FilterResponse>(url, { observe: 'response', params }).pipe(
      map((response: HttpResponse<FilterResponse>) => {
        if (response.body) {
          return {
            students: response.body.students,
            totalPages: response.body.totalPages
          };
        }
        return new FilterResponse();
      })
    );
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


}
