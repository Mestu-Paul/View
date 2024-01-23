import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { FilterParameters } from '../_models/FilterParameters';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  constructor(private studentService: StudentService, private router:Router) {} 
  filterParameters : FilterParameters = new FilterParameters();

  bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  

  @Output() updateFilterParameter : EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    this.filterParameters = this.studentService.getFilterParameters();
    this.filter();
  }

  filter(){
    this.studentService.setFilterParameters(this.filterParameters);
    this.updateFilterParameter.emit(this.filterParameters);
  }
  
  resetFilter(){
    this.filterParameters = new FilterParameters();
    this.filter();
  }
}


