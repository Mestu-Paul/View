import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})

export class TableComponent implements OnInit {

  // ---------- variable declaration --------------
  // for pagination
  pageNumber:number = 1;
  pageSize:number = 10;
  numberOfPages:number = 0;
  paginationArray:any[] = [];
  total:any = 0;
  pagesArray = Array(this.numberOfPages).fill(0).map((x, i) => i + 1);

  // Array to hold student data fetched from API
  students: any[] = []; 

  // for table show & hide 
  showTable: boolean = true;

  // for pop up message
  displayPopup: boolean = false;
  popupInfo:any = {
    popupMessage:'',
    popupHeader:'',
    popupClasses:'',
  }

  // for update info of a current student
  updateInfo:any = {
    updateStatus:false,
    currentStudentInfo:null
  }
  // ----------------------------------------------

  // constructor with studentService to get data from service
  constructor(private studentService: StudentService, private router:Router) {}


  ngOnInit(): void {
    this.updateNumberOfPages(); // Call function to fetch number of students
    this.fetchStudentData(this.pageNumber,this.pageSize); // Call function to fetch student data
  }

  // ------------ pagination update ------------
  
  generatePaginationArray(){
    this.paginationArray = [1];
    let dist = 2;
    console.log(this.pageNumber-dist,this.pageNumber+dist);
    if(this.pageNumber-dist>1)this.paginationArray.push("...");
    for (let index = Math.max(2,this.pageNumber-dist); index <= Math.min(this.numberOfPages-1,this.pageNumber+dist); index++) {
      this.paginationArray.push(index);
    }
    if(this.pageNumber+dist<this.numberOfPages)this.paginationArray.push("...");
    this.paginationArray.push(this.numberOfPages);
    console.log(this.paginationArray);
  }

  // by fetching total number of student calculate number of pages
  updateNumberOfPages(){
    this.studentService.count().subscribe(
      (data) =>{
        this.total = data;
        this.numberOfPages = Math.floor((this.total+this.pageSize-1)/this.pageSize);
        this.generatePaginationArray();
      },
      (error)=>{
        console.log(`Error while retrieving number of Data. >> ${error}`);
        // this.showPopup(`Error while retrieving number of Data. >> ${error}`,"Error","popup-header-delete");
      }
    );
  }
  
  updatePageNumber(pageNumber:number){
    this.pageNumber = pageNumber;
    this.generatePaginationArray();
    this.fetchStudentData(this.pageNumber,this.pageSize);
  }
  // --------------------------------------------

  // ---------- table and form show-hide  ----------
  showAddForm() {
    this.showTable = false;
  }
  
  clearForm(){
    this.updateInfo = {
      updateStatus:false,
      currentStudentInfo:null
    }
  }
  update(){
    this.showTable = true; 
    this.clearForm();
    this.updateNumberOfPages();
    this.fetchStudentData(this.pageNumber,this.pageSize);
  }

  cancel() {
    this.showTable = true; 
    this.clearForm();
  }
  // -------------------------------------

  // -------- pop up message options ---------
  showPopup(msg:string,hdr:string,cls:string) {
    // set data for popup message
    this.popupInfo["popupMessage"] = msg;
    this.popupInfo["popupHeader"] = hdr;
    this.popupInfo["popupClasses"] = cls;
    this.displayPopup = true;
  }
  closePopup() {
    this.displayPopup = false;
    this.fetchStudentData(this.pageNumber,this.pageSize);
  }
  // ------------------------------------------

  
  //------------- data fetch using get method -------------
  fetchStudentData(pageNumber:number,pageSize:number) {
    this.studentService.filterByPage(pageNumber,pageSize).subscribe(
      (data) => {
        if(data.isSuccess){
          this.students = data.students;
        }
        else{
          this.showPopup(data.message,"Error","popup-header-delete");
        }
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );
  }
  
  // ------------ data delete using delete method -----------
  onDelete(studentId: string, studentName:string): void {
    this.studentService.delete(studentId).subscribe(
      () => {
        console.log(studentName,'Student deleted successfully');
        this.showPopup(`Deleted ${studentName}'s information`,'Delete Student','popup-header-delete');
      },
      (error) => {
        console.error('Error deleting student:', error);
        this.showPopup(`Error while ${studentName}'s information deleting ${error}`,'Error','popup-header-delete');
      }
      );
      this.updateNumberOfPages();
  }

  // set data in form for update a current student
  readyFormToUpdate(student: any){
    this.updateInfo['updateStatus']=true;
    this.updateInfo['currentStudentInfo']=student;
    this.showAddForm();
  }
}

