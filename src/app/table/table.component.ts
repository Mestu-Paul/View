import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { FilterParameters } from '../_models/FilterParameters';
import { StudentFrom } from '../_models/StudentForm';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})

export class TableComponent implements OnInit {

  // ---------- variable declaration --------------
  // for filter
  filterParameters: FilterParameters = new FilterParameters();
  
  // for pagination
  numberOfPages:number = 0;

  // Array to hold student data fetched from API
  students: any[] = []; 

  // constructor with studentService to get data from service
  constructor(private studentService: StudentService, private router:Router, 
            private toastr: ToastrService) {}


  ngOnInit(): void {
    this.fetchStudentData(); // Call function to fetch student data
  }

  // ------------ pagination update ------------
  updatePageNumber(pageNumber:number){
    this.filterParameters.pageNumber = pageNumber;
    this.fetchStudentData();
  }
  // --------------------------------------------
  
  //------------- data fetch using get method -------------
  fetchStudentData() {
    this.studentService.customFilter(this.filterParameters).subscribe(
      (data) => {
        this.students = data.students;
        if(this.students.length==0 && this.filterParameters.pageNumber>1){
          this.filterParameters.pageNumber--;
          this.fetchStudentData();
        }
        this.numberOfPages = data.totalPages;
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );
  }

  updateFilterParameter(filterParameters: FilterParameters){
    this.filterParameters = filterParameters;
    this.fetchStudentData();
  }
  
  // ------------ data delete using delete method -----------
  delete(studentId: string, studentName:string): void {
    // if(!confirm("Are you sure to delete the student?"))return;

    this.studentService.delete(studentId).subscribe(
      () => {
        // console.log(studentName,'Student deleted successfully');
        this.toastr.success(`${studentName} deleted`);
        this.fetchStudentData();
      },
      (error) => {
        console.error('Error deleting student:', error);
      }
      );
  }

  // set data in form for update a current student
  readyFormToUpdate(student: any){
    this.studentService.setFormFields(student);
    this.router.navigateByUrl('/update');
  }
  
}

