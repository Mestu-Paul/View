import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StudentServiceService } from '../services/api/student-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})

export class TableComponent implements OnInit {

  constructor(private studentService: StudentServiceService) {
    
  }
  students: any[] = []; // Array to hold student data fetched from API


  ngOnInit(): void {
    this.fetchStudentData(1,10); // Call function to fetch student data
  }

  // ---------- table and form hide show  ----------
  showTable: boolean = true;
  showAddForm() {
    this.showTable = false;
    this.updateData = false;
  }
  save(formData: any) {
    // Add logic to save form data and perform necessary actions
    console.log("clicked saved in table");
    console.log('Form Data:', formData);
    // this.addStudent(formData)
    this.showTable = true; // Display the table again after saving
  }

  cancel() {
    console.log("clicked cancel in table");
    this.showTable = true; 
  }

  // -------------------------------------
  // -------- pop up message options ---------
  displayPopup: boolean = false;
  popupMessage: string = '';
  popupHeader: string = '';
  popupClasses: string = '';

  showPopup() {
    this.displayPopup = true;
  }

  closePopup() {
    this.displayPopup = false;
  }
  // ------------------------------------------

  // data add using post method 
  onSubmit(studentData: any): void {
    console.log(studentData);
    this.studentService.addStudent(studentData).subscribe(
      (response) => {
        console.log('Student added successfully:', response);
      },
      (error) => {
        console.error('Error adding student:', error);
      }
    );
  }

  // data fetch using get method 
  fetchStudentData(pageNumber:number,pageSize:number) {
    this.studentService.getStudentsPage(pageNumber,pageSize).subscribe(
      (data) => {
        this.students = data; // Assign the fetched data to the local students array
        console.log('Fetched student data:', data);
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );
  }


  // data delete using delete method 
  onDelete(studentId: string, studentName:string): void {
    this.studentService.deleteStudent(studentId).subscribe(
      () => {
        console.log(studentName,'Student deleted successfully');
      },
      (error) => {
        console.error('Error deleting student:', error);
      }
    );
  }

  formName:string = '';
  formDepartment:string = '';
  formSession:string = '';
  formGender:string = '';
  // formId:string = '';
  updateData:boolean=false;

  formFields:string[] = ['','','','','']

  readyFormToUpdate(student: any){
    this.updateData=true;
    this.showAddForm();
    this.updateData=true;
    // this.formId = student.id;
    this.formFields[0] = student.name;
    this.formFields[1] = student.department;
    this.formFields[2] = student.session;
    this.formFields[3] = student.gender;
    this.formFields[4] = student.id;
    // console.log("get date from row", this.formFields);
  }
  updateStudent(formData: any) {
    const id = formData['id']; // Extract the ID from formData

    const apiUrl = "https://localhost:7181/api/Students/UpdateStudent/"+id;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Make a PUT request with formData to update the student
    // this.http.put(apiUrl, formData)
    //   .subscribe(
    //     (response) => {
    //       console.log('Student updated successfully:', response);
    //       // Handle success, perform further actions if needed
    //     },
    //     (error) => {
    //       console.error('Error updating student:', error);
    //       // Handle error, show error message or log the error
    //     }
    //   );
    //   this.showTable = true;
  }

}

