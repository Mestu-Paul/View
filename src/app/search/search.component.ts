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
  filterParameter = {
    filterBy:  'studentId',
    filterText:  ''
  };

  

  @Output() updateFilterParameter : EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    
  }

  filter(){
    this.updateFilterParameter.emit(this.filterParameter);
  }
    
}


