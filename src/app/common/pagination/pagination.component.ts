import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnChanges{

  @Input() numberOfPages:number = 0;
  @Input() pageNumber: number = 1;

  paginationArray:any[] = [];
  pagesArray = Array(this.numberOfPages).fill(0).map((x, i) => i + 1);

  @Output() updatePage: EventEmitter<any> = new EventEmitter<any>();

  constructor(){
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['numberOfPages']) {
      this.generatePaginationArray();
    }
  }

  generatePaginationArray(){
    this.paginationArray = [];
    if(this.numberOfPages>0)
      this.paginationArray.push(1);
    let dist = 2;
    if(this.pageNumber-dist-1>1)this.paginationArray.push("...");
    for (let index = Math.max(2,this.pageNumber-dist); index <= Math.min(this.numberOfPages-1,this.pageNumber+dist); index++) {
      this.paginationArray.push(index);
    }
    if(this.pageNumber+dist+1<this.numberOfPages)this.paginationArray.push("...");
    if(this.numberOfPages>1)
      this.paginationArray.push(this.numberOfPages);
  }

  updatePageNumber(pageNumber:number){
    this.pageNumber = pageNumber;
    this.generatePaginationArray();
    this.updatePage.emit(pageNumber);
  }

  previous(){
    if(this.pageNumber<=0)return;
    this.pageNumber--;
    this.generatePaginationArray();
    this.updatePage.emit(this.pageNumber);
  }
  next(){
    if(this.pageNumber>=this.numberOfPages)return;
    this.pageNumber++;
    this.generatePaginationArray();
    this.updatePage.emit(this.pageNumber);
  }
}
