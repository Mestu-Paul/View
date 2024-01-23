import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './student/form/form.component';
import { TableComponent } from './student/table/table.component';

const routes: Routes = [
  {path:'',component:TableComponent},
  {path:'create',component:FormComponent},
  {path:'update',component:FormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
