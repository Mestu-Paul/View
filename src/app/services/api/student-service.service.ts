import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  private allUrl = 'https://localhost:7181/api/Students'; // Your API URL
  private apiUrl = 'https://localhost:7181/api/Students';

  constructor(private http: HttpClient) { }

  // Method to fetch student data from the API
  getStudents(): Observable<any[]> {
    const url = `${this.allUrl}/GetStudent`;
    return this.http.get<any[]>(url);
  }

  getStudentsPage(pageNumber: number, pageSize: number): Observable<any[]> {
    const url = `${this.apiUrl}/GetStudentsPage?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<any[]>(url);
  }

  addStudent(studentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Post`, studentData);
  }

  // Method to delete a student by ID from the API
  deleteStudent(studentId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/DeleteStudent/${studentId}`, { responseType: 'text' });
  }
}
