import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../_services/student.service';
import { Router } from '@angular/router';
import { FilterParameters } from '../../_models/FilterParameters';
import { StudentFrom } from '../../_models/StudentForm';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';

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

  // Array to hold studentComponent data fetched from API
  students: any[] = [];

  
  constructor(private studentService: StudentService, private router:Router,
            private toastr: ToastrService, public accountService:AccountService) {}


  ngOnInit(): void {
  }

  // ------------ pagination update ------------
  updatePageNumber(pageNumber:number){
    this.filterParameters.pageNumber = pageNumber;
    this.fetchStudentData();
  }
  // --------------------------------------------

  //------------- data fetch using get method -------------
  fetchStudentData() {
    this.studentService.customFilter(this.filterParameters).subscribe({
      next: response => {
        if(response.body){
          this.students = response.body.members;
          if(this.students.length==0 && this.filterParameters.pageNumber>1){
            this.filterParameters.pageNumber--;
            this.fetchStudentData();
          }
          this.numberOfPages = response.body.totalPages;
        }
      },
      error: error =>{
        this.toastr.error("You are not permitted");
        this.router.navigateByUrl('/login');
      }
    });
  }

  updateFilterParameter(filterParameters: FilterParameters){
    this.filterParameters = filterParameters;
    this.fetchStudentData();
  }

  // ------------ data delete using delete method -----------
  delete(studentId: string, studentName:string): void {
    if(!confirm("Are you sure to delete the studentComponent?"))return;

    this.studentService.delete(studentId).subscribe(
      () => {
        // console.log(studentName,'Student deleted successfully');
        this.toastr.success(`${studentName} deleted`);
        this.fetchStudentData();
      },
      (error) => {
        console.error('Error deleting studentComponent:', error);
      }
      );
  }

  // set data in form for update a current studentComponent
  readyFormToUpdate(student: any, operation: string){
    this.studentService.setFormFields(student);
    if(operation==='update')
      this.router.navigateByUrl('students/update');
    else
      this.router.navigateByUrl('/partial-update');
  }

}

