import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  private apiUrl = 'https://localhost:7181/api/students';

  constructor(private http: HttpClient) { }

  // Method to fetch student data from the API
  getStudents(): Observable<any[]> {
    const url = `${this.apiUrl}/getstudents`;
    return this.http.get<any[]>(url);
  }

  getStudentsPage(pageNumber: number, pageSize: number): Observable<any[]> {
    const url = `${this.apiUrl}/getstudentspage?pagenumber=${pageNumber}&pagesize=${pageSize}`;
    return this.http.get<any[]>(url);
  }

  addStudent(studentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Post`, studentData);
  }

  // Method to delete a student by ID from the API
  deleteStudent(studentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteStudent/${studentId}`, { observe: 'response', responseType: 'text' });
  }

  updateStudent(studentId: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateStudent/${studentId}`, updatedData,{ observe: 'response', responseType: 'text' });
  }

}
