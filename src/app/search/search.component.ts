import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  constructor(private studentService: StudentService, private router:Router) {} 

  filterBy: string = 'studentId';
  filterText: string = '';

  @Output() filteredStudents : EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    
  }

  filter(){
    console.log(this.filterBy, this.filterText);
    this.studentService.customFilter(1,this.filterBy,this.filterText).subscribe(
      (data) => {
        if(data.isSuccess){
          var students = data.students;
          console.log(students);
          this.filteredStudents.emit(students);
        }
        else{
          console.log("data can not retrieve");
          // this.showPopup(data.message,"Error","popup-header-delete");
        }
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );
  }
}


