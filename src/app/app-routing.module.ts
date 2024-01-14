import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component'; 
import { AddFormComponent } from './add-form/add-form.component';

const routes: Routes = [
  {path:'',component:TableComponent},
  {path:'create',component:AddFormComponent},
  {path:'update/:id',component:AddFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
