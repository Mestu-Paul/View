import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TableComponent } from './table/table.component';
import { PopupComponent } from './popup/popup.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { FormComponent } from './form/form.component';

// const routes: Routes = [
//   { path: './add-new-form', component: AddFormComponent },
// ];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableComponent,
    PopupComponent,
    SearchComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule ,
    RouterModule.forRoot([
      { path: 'page/:pageNumber/:pageSize', component: TableComponent },
    ])
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
