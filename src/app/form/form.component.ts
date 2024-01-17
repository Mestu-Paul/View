import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { StudentService } from '../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  constructor(private studentService: StudentService, private router:Router, private route:ActivatedRoute){}
  @Input() formFields:any={};

  popupInfo: any = {}

  @Input() updateInfo:any = {
    updateStatus:false,
    currentStudentInfo:null
  }

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {

    if(this.updateInfo["updateStatus"]){
      this.formFields["id"] = this.updateInfo["currentStudentInfo"]["id"];
      this.formFields["student_id"] = this.updateInfo["currentStudentInfo"]["studentId"];
      this.formFields["name"]=this.updateInfo["currentStudentInfo"]["name"],
      this.formFields["department"]=this.updateInfo["currentStudentInfo"]["department"],
      this.formFields["session"]=this.updateInfo["currentStudentInfo"]["session"],
      this.formFields["phone"]=this.updateInfo["currentStudentInfo"]["phone"],
      this.formFields["gender"]=this.updateInfo["currentStudentInfo"]["gender"],
      this.formFields["blood_group"]=this.updateInfo["currentStudentInfo"]["bloodGroup"],
      this.formFields["last_donated_at"]=this.updateInfo["currentStudentInfo"]["lastDonatedAt"],
      this.formFields["address"]=this.updateInfo["currentStudentInfo"]["address"]
    }
    else 
      this.clearForm();
  }

  // -------- pop up message options ---------
  displayPopup: boolean = false;
  showPopup(msg:string,hdr:string,cls:string) {
    // set data for popup message
    this.displayPopup = true;
    this.popupInfo["popupMessage"] = msg;
    this.popupInfo["popupHeader"] = hdr;
    this.popupInfo["popupClasses"] = cls;
  }
  closePopup() {
    this.displayPopup = false;
  }
  // ------------------------------------------


  onSubmit() {
    var data:any = {
    name:this.formFields["name"],
    department:this.formFields["department"],
    session:this.formFields["session"],
    phone:this.formFields["phone"],
    lastDonatedAt:this.formFields["last_donated_at"],
    address:this.formFields["address"]};

    if(!this.updateInfo["updateStatus"])
    {
      
      data['gender'] = this.formFields["gender"];
      data['bloodGroup'] = this.formFields["blood_group"];
      data['studentId']=this.formFields["student_id"];

      this.studentService.create(data).subscribe(
        (response) => {
          console.log('Student added successfully:', response);
          this.showPopup(`Added ${data['name']}'s information`,'Add Student','popup-header-add');
        },
        (error) => {
          console.error('Error adding student:', error);
          this.showPopup(`Error : ${error}`,'Error','popup-header-delete');
        });
    }
    else
    {
      console.log(data);
      this.studentService.update(this.formFields['id'], data).subscribe(
        (response) => {
          console.log('Student updated successfully:', response);
          this.showPopup(`Updated ${data['name']}'s information`,'Update Student','popup-header-update');
        },
        (error) => {
          console.error('Error updating student:', error);
          this.showPopup(`Current and previous data same`,'Info','popup-header-add');
        }
      );
    }
    this.onCancel();
  }
  
  onCancel() {
    this.clearForm();
    this.cancel.emit();
  }

  clearForm() {
    this.updateInfo={
      updateStatus:false,
      currentStudentInfo:null
    }
    this.formFields["student_id"] ="";
    this.formFields["name"]="";
    this.formFields["department"]="";
    this.formFields["session"]="";
    this.formFields["phone"]="";
    this.formFields["gender"]="Male";
    this.formFields["blood_group"]="A+";
    this.formFields["last_donated_at"]="";
    this.formFields["address"]="";

  }
}
