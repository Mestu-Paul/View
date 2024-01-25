import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { StudentService } from '../../_services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentFrom } from '../../_models/StudentForm';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit{
  constructor(private studentService: StudentService, private router:Router, private route:ActivatedRoute, private toastr: ToastrService){}
  formFields:any;

  popupInfo: any = {}

  updateInfo:any = {}

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    this.updateInfo = this.studentService.getFormFields();
    this.formFields = this.updateInfo['formFields'];
  }


  onSubmit() {
    if(!this.updateInfo['updateStatus'])
    {
      this.studentService.create(this.formFields).subscribe(
        (response) => {
          this.toastr.success("Add new studentComponent");
          // console.log('Student added successfully:', response);
        },
        (error) => {
          console.error('Error adding studentComponent:', error);
        });
    }
    else
    {
      this.studentService.update(this.formFields).subscribe(
        (response) => {
          this.toastr.success("Updated");
          // console.log('Student updated successfully:', response);
        },
        (error) => {
          console.error('Error updating studentComponent:', error);
        }
      );
    }
    this.onCancel();
  }

  onCancel() {
    this.cancel.emit();
    this.router.navigateByUrl('/');
    this.clearForm();
  }

  clearForm() {
    this.studentService.resetFormFields();
    this.formFields = new StudentFrom();
  }
}
