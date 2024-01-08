import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StudentServiceService } from '../services/api/student-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})

export class TableComponent implements OnInit {
  pageNumber:number = 1;
  pageSize:number = 10;
  constructor(private studentService: StudentServiceService) {
    
  }
  students: any[] = []; // Array to hold student data fetched from API


  ngOnInit(): void {
    this.fetchStudentData(this.pageNumber,this.pageSize); // Call function to fetch student data
  }

  // ---------- table and form hide show  ----------
  showTable: boolean = true;
  showAddForm() {
    this.showTable = false;
    this.updateData = false;
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


  showPopup(msg:string,hdr:string,cls:string) {
    this.popupMessage=msg; this.popupHeader=hdr;
    this.popupClasses = cls; this.displayPopup = true;
  }

  closePopup() {
    this.displayPopup = false;
  }
  // ------------------------------------------

  
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

  // data add using post method 
  onSubmit(studentData: any): void {
    this.showTable = true;
    console.log(studentData);
    this.studentService.addStudent(studentData).subscribe(
      (response) => {
        console.log('Student added successfully:', response);
        this.showPopup(`Added ${studentData['name']}'s information`,'Add Student','popup-header-add');
      },
      (error) => {
        console.error('Error adding student:', error);
        this.showPopup(`Error : ${error}`,'Error','popup-header-delete');
      });
      this.fetchStudentData(this.pageNumber,this.pageSize);
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
      this.fetchStudentData(this.pageNumber,this.pageSize);
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
    console.log(formData['id']);
    this.studentService.updateStudent(formData['id'], formData).subscribe(
      (response) => {
        console.log('Student updated successfully:', response);
        this.showPopup(`Updated ${formData['name']}'s information`,'Update Student','popup-header-update');
      },
      (error) => {
        console.error('Error updating student:', error);
        // Handle error
      }
    );
    this.fetchStudentData(this.pageNumber,this.pageSize);
    this.showTable = true;
  }

}

