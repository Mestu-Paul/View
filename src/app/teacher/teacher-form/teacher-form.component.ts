import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentFrom } from '../../_models/StudentForm';
import { ToastrService } from 'ngx-toastr';
import { TeacherService } from '../../_services/teacher.service';
import { Teacher } from '../../_models/Teacher';
@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.css'
})
export class TeacherFormComponent implements OnInit {
  constructor(private teacherService: TeacherService, private router:Router, private route:ActivatedRoute, private toastr: ToastrService){}
  formFields:Teacher = new Teacher();

  ngOnInit(): void {
    this.formFields = this.teacherService.getTeacher();
  }


  onSubmit() {
    this.teacherService.update(this.formFields, this.formFields.username).subscribe(
      (response) => {
        this.toastr.success("Updated");
        // console.log('Student updated successfully:', response);
      },
      (error) => {
        console.error('Error updating studentComponent:', error);
      }
    );
    this.onCancel();
  }

  onCancel() {
    this.router.navigateByUrl('/teachers');
    this.clearForm();
  }

  clearForm() {
    this.formFields = new Teacher();
    this.teacherService.setTeacher(this.formFields);
  }
}
