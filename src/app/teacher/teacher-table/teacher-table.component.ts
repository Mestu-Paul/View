import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TeacherService } from '../../_services/teacher.service';
import { Observable } from 'rxjs';
import { Teacher } from '../../_models/Teacher';
import { TeacherFilterParameters } from '../../_models/TeacherFilterParameters';

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrl: './teacher-table.component.css'
})
export class TeacherTableComponent implements OnInit {
  teachers:Teacher[] =[];
  filterParameters:TeacherFilterParameters = new TeacherFilterParameters();
  currentUser:any;

  totalPage:number=0;

  constructor(public accountService:AccountService, private router:Router, 
    private toastr:ToastrService, private teacherService:TeacherService){

  }
  ngOnInit(): void {
    this.currentUser  = this.accountService.getCurrentUser();
    if(this.currentUser===null){
      this.toastr.error("You are not permitted");
      this.router.navigateByUrl("login");
      return;
    }
    if(this.currentUser.role==='student'){
      this.toastr.error("You are not permitted");
      this.router.navigateByUrl("students");
    }

    this.loadTeachers();
  }

  loadTeachers(){
    this.teacherService.customFilter(this.filterParameters).subscribe({
      next: data =>{
        if(data.body){
          this.teachers = data.body.members;
          this.totalPage = data.body.totalPages;
        }
      },
      error: error =>{
        console.log(error);
      }

    })
  }

  update(teacher:Teacher){
    this.teacherService.setTeacher(teacher);
    this.router.navigateByUrl("teachers/update");
  }

  // ------------ pagination update ------------
  updatePageNumber(pageNumber:number){
    this.filterParameters.pageNumber = pageNumber;
    this.loadTeachers();
  }
  
}
