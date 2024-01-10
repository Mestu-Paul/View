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

export class StudentServiceService {

  private apiUrl = 'https://localhost:7250/api/students';

  constructor(private http: HttpClient) { }

  // Method to fetch student data from the API
  getNumberOfData():Observable<any[]>{
    const url = `${this.apiUrl}/GetTotalNumberOfStudents`;
    return this.http.get<any[]>(url);
  }

  getStudentsPage(pageNumber: number, pageSize: number): Observable<StudentData> {
    const url = `${this.apiUrl}/GetStudents?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return  this.http.get<StudentData>(url);
  }

  addStudent(studentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/CreateNewStudent`, studentData);
  }

  // Method to delete a student by ID from the API
  deleteStudent(studentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteStudent/${studentId}`, { observe: 'response', responseType: 'text' });
  }

  updateStudent(studentId: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateStudent/${studentId}`, updatedData,{ observe: 'response', responseType: 'text' });
  }

}
