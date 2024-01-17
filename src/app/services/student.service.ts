import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student'

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  private apiUrl = 'https://localhost:7250/api/student';
  constructor(private http: HttpClient) { }

  // Method to fetch student data from the API
  count():Observable<any[]>{
    const url = `${this.apiUrl}/count`;
    return this.http.get<any[]>(url);
  }

  filterByPage(pageNumber: number, pageSize: number): Observable<Student> {
    const url = `${this.apiUrl}/filterByPage?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return  this.http.get<Student>(url);
  }

  customFilter(filterBy:string, filterText:string):Observable<Student>{
    const url = `${this.apiUrl}/customFilter?pageNumber=${1}&filterBy=${filterBy}&filterText=${filterText}`;
    return  this.http.get<Student>(url);
  }

  create(studentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, studentData);
  }

  // Method to delete a student by ID from the API
  delete(studentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${studentId}`, { observe: 'response', responseType: 'text' });
  }

  update(studentId: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${studentId}`, updatedData,{ observe: 'response', responseType: 'text' });
  }

}
