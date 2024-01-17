import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface StudentData {
  students: {
    id: string;
    createdAt: Date | null;
    lastUpdatedAt: Date | null;
    studentId: string | null;
    name: string;
    department: string;
    session: string;
    phone: string | null;
    gender: string;
    bloodGroup: string | null;
    lastDonatedAt: Date | null;
    address: string | null;
  }[];
  message: string;
  isSuccess: boolean;
}


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

  filterByPage(pageNumber: number, pageSize: number): Observable<StudentData> {
    const url = `${this.apiUrl}/filterByPage?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return  this.http.get<StudentData>(url);
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
