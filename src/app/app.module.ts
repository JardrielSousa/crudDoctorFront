import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { SpecialtiesComponent } from './pages/specialties/specialties.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AddDoctorComponent } from './pages/doctor/add-doctor/add-doctor.component';
import { NavComponent } from './pages/nav/nav.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { EditDoctorComponent } from './pages/doctor/edit-doctor/edit-doctor.component';
import { AddSpecialtiesComponent } from './pages/specialties/add-specialties/add-specialties.component';
import { EditSpecialtiesComponent } from './pages/specialties/edit-specialties/edit-specialties.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DoctorComponent,
    SpecialtiesComponent,
    AddDoctorComponent,
    NavComponent,
    EditDoctorComponent,
    AddSpecialtiesComponent,
    EditSpecialtiesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
