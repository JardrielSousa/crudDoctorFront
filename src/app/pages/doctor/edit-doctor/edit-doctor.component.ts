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
  specialtieslist:any = [];
  specialitiesByDoctorIdList:any;
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
      this.doctor.id = this.id
    });

    this.specialtiesService.readAll()
    .subscribe((resp:any)=>{
      this.specialtieslist = resp.content
      this.specialitiesByDoctorIdList = this.specialtieslist.filter(
        (list:any)=>list.doctor.id == this.id);
        console.log(this.specialitiesByDoctorIdList);

    });
  }


  doctorForm = this.fb.group({
    id:[''],
    name: [
      '',
      [Validators.minLength(4), Validators.maxLength(256)],
    ],
    birthDate: [new Date(), ],
    active: [this.doctor.active, ],
    specialties: [
      '',
    ],
  });

  onSubmit(){
    this.setFieldsForm();
    this.doctorService.update(this.id,this.doctorForm.value).subscribe((resp:any)=>{
      this.doctorService.verMsg('doctor was changed!!!')
      this.router.navigate(['/doctor']);
    });
    this.doctorForm.value.specialties.doctor = this.doctor
    this.specialtiesService.update(this.doctorForm.value.specialties.id , {
      id : this.doctorForm.value.specialties.id,
      name:this.doctorForm.value.specialties.name,
      description:this.doctorForm.value.specialties.description,
      active:this.doctorForm.value.specialties.active,
      doctorId:this.doctorForm.value.specialties.doctor.id
    })
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

  private setFieldsForm() {
    this.doctorForm.controls['id'].setValue(this.id);
    if (this.doctorForm.value.name == "")
      this.doctorForm.controls['name'].setValue(this.doctor.name);
    if (this.doctorForm.value.birthDate == "")
      this.doctorForm.controls['birthDate'].setValue(this.doctor.birthDate);
    if (this.doctorForm.value.active == this.doctor.active)
      this.doctorForm.controls['active'].setValue(this.doctor.active);
    if(this.doctorForm.value.specialties == this.specialitiesByDoctorIdList)
      this.doctorForm.controls['specialties'].setValue(this.doctorForm.value.specialties);

  }

}
