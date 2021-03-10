import { SpecialtiesService } from './../../service/specialties.service';
import { DoctorService } from './../../service/doctor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.css']
})
export class SpecialtiesComponent implements OnInit {

  specialties:any = [];
  form:boolean = false;

  constructor(
    private doctorService:DoctorService,
    private specialtiesService :SpecialtiesService) { }

  ngOnInit(): void {
    this.specialtiesService.readAll().
    subscribe((resp:any)=>{
      this.specialties = resp.content
      console.log(this.specialties);

    })
  }

  displayedColumns: string[] = ['name', 'description', 'active','doctor','action'];

}
