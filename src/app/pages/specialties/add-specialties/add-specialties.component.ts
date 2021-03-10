import { SpecialtiesService } from './../../../service/specialties.service';
import { DoctorService } from './../../../service/doctor.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-specialties',
  templateUrl: './add-specialties.component.html',
  styleUrls: ['./add-specialties.component.css']
})
export class AddSpecialtiesComponent implements OnInit {
  doctorList:any
  active = true;
  constructor( private fb: FormBuilder,
    private router:Router,
    private doctorService:DoctorService,
    private specialtiesService:SpecialtiesService) { }

  ngOnInit(): void {
    this.doctorService.readAll()
    .subscribe((resp:any)=>{
      this.doctorList = resp.content
    })
  }

  specialtiesForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(256)],
    ],
    description: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(256)],
    ],
    active: ['', [Validators.required]],
    doctorId: [
      '',[Validators.required]
    ],
  });

  onSubmit(){
    this.specialtiesForm.markAllAsTouched();
    console.log(this.specialtiesForm.value);
    if(this.specialtiesForm.invalid)
      return;
    this.specialtiesService.create(this.specialtiesForm.value).subscribe((resp:any)=>{
      this.doctorService.verMsg('specialties was created!!!')
      this.router.navigate(['/specialties']);
    });
  }

  get f() {
    return this.specialtiesForm.controls
  }

}
