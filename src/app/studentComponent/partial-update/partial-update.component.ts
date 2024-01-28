import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../_services/student.service';
import { ToastrService } from 'ngx-toastr';
import { StudentFrom } from '../../_models/StudentForm';
import { compare } from 'fast-json-patch';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partial-update',
  templateUrl: './partial-update.component.html',
  styleUrl: './partial-update.component.css'
})
export class PartialUpdateComponent implements OnInit{

  formFields: StudentFrom = new StudentFrom();
  oldformFields: StudentFrom = new StudentFrom();

  constructor(private studentService: StudentService, private toastr: ToastrService, private router: Router){}
  ngOnInit(): void {
    const formFieldsData = this.studentService.getFormFields()['formFields'];
    this.formFields = JSON.parse(JSON.stringify(formFieldsData));
    this.oldformFields = JSON.parse(JSON.stringify(formFieldsData));
  }

  onSubmit(){   
    console.log(this.formFields, '\n', this.oldformFields);
    const patch = compare(this.oldformFields, this.formFields);
    if(patch.length>0){
      this.studentService.partialUpdate(this.formFields.id, patch).subscribe({
        next: response => this.toastr.success("Updated"),
        error: error => console.log(error)
      });
    }
    else{
      this.toastr.info("No changes made");
    }
    this.onCancel();
  }

  onCancel(){
    this.studentService.resetFormFields();
    this.router.navigateByUrl('/students');
  }
  
}
