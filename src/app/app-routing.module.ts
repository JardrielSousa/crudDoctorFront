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
  { path: 'specialties', component: SpecialtiesComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
