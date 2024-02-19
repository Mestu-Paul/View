import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './studentComponent/form/form.component';
import { TableComponent } from './studentComponent/table/table.component';
import { PartialUpdateComponent } from './studentComponent/partial-update/partial-update.component';
import { LoginComponent } from './commonComponent/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { RegisterComponent } from './commonComponent/register/register.component';
import { TeacherTableComponent } from './teacher/teacher-table/teacher-table.component';
import { TeacherFormComponent } from './teacher/teacher-form/teacher-form.component';
import { InboxComponent } from './messages/inbox/inbox.component';
import { MessageComponent } from './messages/message/message.component';
import { ChatComponent } from './messages/chat/chat.component';
import { HomeComponent } from './commonComponent/home/home.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'students',component:TableComponent},
  {path:'students/update',component:FormComponent},
  {path:'partial-update',component:PartialUpdateComponent},
  {path:'admin-dashboard',component:DashboardComponent},
  {path:'teachers',component:TeacherTableComponent},
  {path:'teachers/update',component:TeacherFormComponent},
  {path:'messages',component:MessageComponent},
  {path:'messages/inbox',component:InboxComponent},
  {path:'messages/inbox/chat',component:ChatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
