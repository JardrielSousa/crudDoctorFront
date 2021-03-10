import { SpecialtiesService } from './../../../service/specialties.service';
import { DoctorService } from './../../../service/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export interface Specialties{
  name:string,
  description:string,
  active:boolean,
  doctorId:number
}

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})
export class EditDoctorComponent implements OnInit {
  specialtieslist:any;
  id:any;
  isDelete:any;
  doctor = {
    id: '',
    name : '',
    birthDate:new Date(),
    active : true,
    specialties:[]
  }
  constructor( private fb: FormBuilder,
    private router:Router,
    private doctorService:DoctorService,
    private specialtiesService:SpecialtiesService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const del = this.route.snapshot.paramMap.get('del');
    this.isDelete = (del === "true")

    if(this.isDelete){
      this.doctorForm.controls['name'].disable();
      this.doctorForm.controls['birthDate'].disable();
      this.doctorForm.controls['active'].disable();
      this.doctorForm.controls['specialties'].disable();
    }
    this.doctorService.readById(id)
    .subscribe((resp:any)=>{
      this.doctor = resp;
      this.id = id;
    });
    this.specialtiesService.readAll()
    .subscribe((resp:any)=>{
      this.specialtieslist = resp.content
      console.log(this.specialtieslist);

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
    if(this.doctorForm.invalid)
      return;
    this.doctorForm.value.id = this.id
    this.doctorService.update(this.id,this.doctorForm.value).subscribe((resp:any)=>{
      this.doctorService.verMsg('doctor was changed!!!')
      this.router.navigate(['/doctor']);
    });
    this.doctorForm.controls['doctor'].setValue(this.doctorForm.value);
    this.specialtiesService.create(this.doctorForm.value)
    .subscribe((resp:any)=>{
      console.log(resp);

    })
  }

  ondelete(){
    this.doctorService.delete(this.id)
    .subscribe((resp:any)=>{
      this.router.navigate(['doctor'])
    });
  }
  get f() {
    return this.doctorForm.controls
  }

}
