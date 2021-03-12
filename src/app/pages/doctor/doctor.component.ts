import { SpecialtiesService } from './../../service/specialties.service';
import { DoctorService } from './../../service/doctor.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctors:any = [];
  form:boolean = false;

  constructor(
    private doctorService:DoctorService,
    private specialtiesService:SpecialtiesService) { }

  ngOnInit(): void {
    this.doctorService.readAll().
    subscribe((resp:any)=>{
      this.doctors = resp.content
      console.log(this.doctors);
    });
  }

  displayedColumns: string[] = ['name', 'birthdate', 'active','action'];

}
