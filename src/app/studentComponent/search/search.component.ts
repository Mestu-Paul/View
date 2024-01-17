import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  searchText:string='';
  filterBy:String='studentId';

  ngOnInit(): void {
    
  }

  search(){
    
  }
}
