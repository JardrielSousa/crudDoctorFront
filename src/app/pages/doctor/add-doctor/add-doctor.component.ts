import { SpecialtiesService } from './../../../service/specialties.service';
import { DoctorService } from './../../../service/doctor.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css'],
})
export class AddDoctorComponent implements OnInit {
  specialtieslist:any
  active = true;
  constructor( private fb: FormBuilder,
    private router:Router,
    private doctorService:DoctorService,
    private specialtiesService:SpecialtiesService) { }

  ngOnInit(): void {
    this.specialtiesService.readAll()
    .subscribe((resp:any)=>{
      this.specialtieslist = resp.content
    })

  }


  doctorForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(256)],
    ],
    birthDate: ['', [Validators.required]],
    active: ['', [Validators.required]],
    specialties: [
      '',
    ],
  });

  onSubmit(){
    this.doctorForm.markAllAsTouched();
    console.log(this.doctorForm.value);
    if(this.doctorForm.invalid)
      return;
    this.doctorService.create(this.doctorForm.value).subscribe((resp:any)=>{
      this.doctorService.verMsg('doctor was created!!!')
      this.router.navigate(['/doctor']);
    });
    this.doctorForm.controls['doctor'].setValue(this.doctorForm.value);
    this.specialtiesService.create(this.doctorForm.value)
    .subscribe((resp:any)=>{
      console.log(resp);

    })
  }

  get f() {
    return this.doctorForm.controls
  }
}
