import { SpecialtiesService } from './../../service/specialties.service';
import { DoctorService } from './../../service/doctor.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  doctors:any = [];
  selected = '1';
  specialties:any = [];
  constructor(private router: Router,
    private doctorService:DoctorService,
    private specialtiesService:SpecialtiesService) { }

  ngOnInit(): void {
    this.specialtiesService.readAll()
    .subscribe((resp:any)=>{
      this.specialties = resp.content
    });
    this.doctorService.getDoctorBySpecialties(this.selected).
    subscribe((resp:any)=>{
      this.doctors = resp
    })
  }
  displayedColumns: string[] = ['name', 'birthdate', 'active','action'];

  onSelected(){
    this.doctorService.getDoctorBySpecialties(this.selected).
    subscribe((resp:any)=>{
      this.doctors = resp
    })
  }
}
