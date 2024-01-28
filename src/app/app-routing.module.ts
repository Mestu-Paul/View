import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './studentComponent/form/form.component';
import { TableComponent } from './studentComponent/table/table.component';
import { PartialUpdateComponent } from './studentComponent/partial-update/partial-update.component';
import { LoginComponent } from './commonComponent/login/login.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'students',component:TableComponent},
  {path:'create',component:FormComponent},
  {path:'update',component:FormComponent},
  {path:'partial-update',component:PartialUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
