import { EditSpecialtiesComponent } from './pages/specialties/edit-specialties/edit-specialties.component';
import { AddSpecialtiesComponent } from './pages/specialties/add-specialties/add-specialties.component';
import { EditDoctorComponent } from './pages/doctor/edit-doctor/edit-doctor.component';
import { AddDoctorComponent } from './pages/doctor/add-doctor/add-doctor.component';
import { SpecialtiesComponent } from './pages/specialties/specialties.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'doctor', component: DoctorComponent },
  { path: 'addDoctor', component: AddDoctorComponent },
  { path: 'editDoctor/:id/:del', component: EditDoctorComponent },
  { path: 'specialties', component: SpecialtiesComponent },
  { path: 'addSpecialties', component: AddSpecialtiesComponent },
  { path: 'editSpecialties/:id/:del', component: EditSpecialtiesComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
