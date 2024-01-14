import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { StudentServiceService } from '../services/api/student-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit{
  constructor(private studentService: StudentServiceService, private router:Router, private route:ActivatedRoute){}
  @Input() formFields:any={};

  popupInfo: any = {}

  @Input() updateInfo:any = {
    updateStatus:false,
    currentStudentInfo:null
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any)=>{
      this.updateInfo = JSON.parse(params.updateInfo);
    });   
    console.log("-----------------------------");
    console.log(this.updateInfo);
    
    if(this.updateInfo["updateStatus"]){
      console.log("updating.........");
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
    else{
      this.clearForm();
    }
    console.log(this.formFields);
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
    id:this.formFields["id"],
    studentId:this.formFields["student_id"],
    name:this.formFields["name"],
    department:this.formFields["department"],
    session:this.formFields["session"],
    phone:this.formFields["phone"],
    gender:this.formFields["gender"],
    bloodGroup:this.formFields["blood_group"],
    lastDonatedAt:this.formFields["last_donated_at"],
    address:this.formFields["address"]};

    console.log(data);
    console.log(this.updateInfo["updateStatus"]);
    if(!this.updateInfo["updateStatus"])
    {
      this.studentService.addStudent(data).subscribe(
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
      this.studentService.updateStudent(data['id'], data).subscribe(
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
    this.clearForm();
    this.router.navigate(['']);
  }
  
  onCancel() {
    this.clearForm();
    this.router.navigate(['']);
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
