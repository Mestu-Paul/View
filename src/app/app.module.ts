import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
    PartialUpdateComponent
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
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
