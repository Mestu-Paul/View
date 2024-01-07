import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent{
  formFieldsTitle:string[]=['name','dept','session','gender'];
  @Input() formFields:string[]=['','','','Male',''];
  
  // setData(name:string,dept:string,session:string,gender:string){
  //   this.name = name;
  //   this.dept = dept;
  //   this.session = session;
  //   this.gender = gender;
  // }

  // -------- pop up message options ---------
  displayPopup: boolean = false;
  popupMessage: string = '';
  popupHeader: string = '';
  popupClasses: string = '';

  showPopup() {
    this.displayPopup = true;
  }

  closePopup() {
    this.displayPopup = false;
  }
  // ------------------------------------------

  @Output() save: EventEmitter<any> = new EventEmitter<any>();
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  @Input() updateData: boolean = false;
  onSubmit() {
    for(let i=0; i<4; i++){
      if(this.formFields[i].length==0){
        this.displayPopup=true;
        this.popupHeader = "Warning"
        this.popupClasses = "popup-header-delete";
        this.popupMessage = this.formFieldsTitle[i]+" can not be empty.";
        return;
      }
    }
    if(!this.updateData)
      this.save.emit({name:this.formFields[0],department:this.formFields[1],session:this.formFields[2],gender:this.formFields[3]});
    else
      this.update.emit({id:this.formFields[4], name:this.formFields[0],department:this.formFields[1],session:this.formFields[2],gender:this.formFields[3]});

    this.clearForm();
  }
  
  onCancel() {
    this.cancel.emit();
    this.clearForm();
  }

  clearForm() {
    for(let i=0; i<4; i++){
      this.formFields[i]='';
    }
  }
}
