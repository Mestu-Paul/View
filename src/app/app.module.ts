import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './commonComponent/header/header.component';
import { TableComponent } from './studentComponent/table/table.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './studentComponent/search/search.component';
import { FormComponent } from './studentComponent/form/form.component';
import { PaginationComponent } from './commonComponent/pagination/pagination.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { PartialUpdateComponent } from './studentComponent/partial-update/partial-update.component';
import { LoginComponent } from './commonComponent/login/login.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { RegisterComponent } from './commonComponent/register/register.component';
import { TeacherTableComponent } from './teacher/teacher-table/teacher-table.component';
import { TeacherFormComponent } from './teacher/teacher-form/teacher-form.component';
import { InboxComponent } from './messages/inbox/inbox.component';
import { ChatComponent } from './messages/chat/chat.component';

// const routes: Routes = [
//   { path: './add-new-form', component: AddFormComponent },
// ];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    FormComponent,
    TableComponent,
    PaginationComponent,
    PartialUpdateComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    TeacherTableComponent,
    TeacherFormComponent,
    InboxComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
