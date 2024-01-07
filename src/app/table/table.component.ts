import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})

export class TableComponent implements OnInit {
  students: any[] = []; // Array to hold student data fetched from API

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchStudentData(); // Call function to fetch student data
  }

  // ---------- table and form hide show  ----------
  showTable: boolean = true;
  showAddForm() {
    this.showTable = false;
    this.updateData = false;
  }
  save(formData: any) {
    // Add logic to save form data and perform necessary actions
    console.log("clicked saved in table");
    console.log('Form Data:', formData);
    this.addStudent(formData)
    this.showTable = true; // Display the table again after saving
  }

  cancel() {
    console.log("clicked cancel in table");
    this.showTable = true; // Display the table again on cancel
  }

  // -------------------------------------
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

  // data add using post method 
  addStudent(newStudent:any) {
    this.showPopup();
    const apiUrl = 'https://localhost:7181/api/Students/Post';
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post(apiUrl, newStudent, httpOptions)
      .subscribe(
        (response) => {
          const { id, name, department, session, gender } = response as any;
          // this.popupTitle = "Update";
          this.popupHeader = "Add New Student"
          this.popupClasses = "popup-header-add";
          this.popupMessage = "New student "+name+"'s information added.";
          console.log('New student added:', response);
          // Handle success, perform further actions if needed
        },
        (error) => {
          console.error('Error adding student:', error);
          // Handle error, show error message or log the error
        }
      );
      this.fetchStudentData();
  }


  // data fetch using get method 
  fetchStudentData() {
    this.http.get<any[]>('https://localhost:7181/api/students/getstudent').subscribe(
      data => {
        this.students = data; // Assign fetched data to students array
        console.log(data);
      },
      error => {
        console.log('Error fetching student data:', error);
      }
    );
  }


  // data delete using delete method 
  deleteStudent(id: string, name: string) {
    console.log(id);
    this.showPopup();
    const deleteUrl = 'https://localhost:7181/api/students/deletestudent/' + id;

    this.http.delete(deleteUrl, { observe: 'response', responseType: 'text' })
      .subscribe(
        (response) => {
          if (response.status === 200) {
            this.popupHeader = "Delete Student"
            this.popupClasses = "popup-header-delete";
            this.popupMessage = name + " " + (String)(response.body);
            console.log('Success:', response.body);
          }
          else if (response.status === 404) {
            this.popupMessage = (String)(response.body);
          }
        },
        (error: HttpErrorResponse) => {
          // Handle other error scenarios
          console.error('Error:', error.message);
        }
      );
    this.fetchStudentData();
  }

  formName:string = '';
  formDepartment:string = '';
  formSession:string = '';
  formGender:string = '';
  // formId:string = '';
  updateData:boolean=false;

  formFields:string[] = ['','','','','']

  readyFormToUpdate(student: any){
    this.updateData=true;
    this.showAddForm();
    this.updateData=true;
    // this.formId = student.id;
    this.formFields[0] = student.name;
    this.formFields[1] = student.department;
    this.formFields[2] = student.session;
    this.formFields[3] = student.gender;
    this.formFields[4] = student.id;
    // console.log("get date from row", this.formFields);
  }
  updateStudent(formData: any) {
    const id = formData['id']; // Extract the ID from formData

    const apiUrl = "https://localhost:7181/api/Students/UpdateStudent/"+id;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Make a PUT request with formData to update the student
    this.http.put(apiUrl, formData)
      .subscribe(
        (response) => {
          console.log('Student updated successfully:', response);
          // Handle success, perform further actions if needed
        },
        (error) => {
          console.error('Error updating student:', error);
          // Handle error, show error message or log the error
        }
      );
      this.showTable = true;
  }

}

