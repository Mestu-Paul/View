import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './studentComponent/form/form.component';
import { TableComponent } from './studentComponent/table/table.component';

const routes: Routes = [
  {path:'',component:TableComponent},
  {path:'create-student',component:FormComponent},
  {path:'update-student/:id',component:FormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
