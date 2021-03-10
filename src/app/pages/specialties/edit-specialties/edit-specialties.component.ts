import { SpecialtiesService } from './../../../service/specialties.service';
import { DoctorService } from './../../../service/doctor.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-specialties',
  templateUrl: './edit-specialties.component.html',
  styleUrls: ['./edit-specialties.component.css']
})
export class EditSpecialtiesComponent implements OnInit {
  isDelete:boolean = false
  doctorList:any;
  id:any;
  active = true;
  specialties:any
  constructor( private fb: FormBuilder,
    private router:Router,
    private doctorService:DoctorService,
    private specialtiesService:SpecialtiesService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const del = this.route.snapshot.paramMap.get('del');
    this.isDelete = (del === "true")

    this.id = id

    if(this.isDelete){
      this.specialtiesForm.controls['name'].disable();
      this.specialtiesForm.controls['description'].disable();
      this.specialtiesForm.controls['active'].disable();
      this.specialtiesForm.controls['doctorId'].disable();
    }
    this.specialtiesService.readById(id)
    .subscribe((resp:any)=>{
      this.specialties = resp;
      console.log(this.specialties);
    });
    this.doctorService.readAll()
    .subscribe((resp:any)=>{
      this.doctorList = resp.content
    });
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

  ondelete(){
    this.specialtiesService.delete(this.id)
    .subscribe((resp:any)=>{
      this.router.navigate(['specialties'])
    });
  }

  get f() {
    return this.specialtiesForm.controls
  }

}
