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
  active : boolean = true;
  constructor( private fb: FormBuilder,
    private router:Router,
    private doctorService:DoctorService,
    private specialtiesService:SpecialtiesService) { }

  ngOnInit(): void {
    this.active = true;
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
    birthDate: [new Date(), [Validators.required]],
    active: [true, [Validators.required]],
    specialties: [
      '',
    ],
  });

  onSubmit(){
    let doctorId;
    this.doctorForm.markAllAsTouched();
    console.log(this.doctorForm.value);
    if(this.doctorForm.invalid)
      return;
    this.doctorService.create(this.doctorForm.value).subscribe((resp:any)=>{
      this.doctorService.verMsg('doctor was created!!!')
      this.insertSpecialties(resp.id);
      this.router.navigate(['/doctor']);
    });
  }

  private insertSpecialties(doctorId: undefined) {
    for (const iterator of this.doctorForm.value.specialties) {
      this.specialtiesService.create({
        name: iterator.name,
        description: iterator.description,
        active: iterator.active,
        doctorId: doctorId
      })
        .subscribe((resp: any) => {
          console.log(resp);
        });
    }
  }

  get f() {
    return this.doctorForm.controls
  }
}
