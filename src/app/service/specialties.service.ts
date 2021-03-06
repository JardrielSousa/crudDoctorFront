import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {

  baseUrl = `${environment.url}v1/crud/specialties`;
  constructor(private http: HttpClient,
    private snackBar:MatSnackBar) { }


  verMsg(msg:string,isError:boolean=false):void{
    console.log(msg)
    this.snackBar.open(msg,'X',{
      duration:3000,
      horizontalPosition:"right",
      verticalPosition:"top",
      panelClass: isError ? ['msgError'] : ['msgSucess']
    })

  }

  create(specialties: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, specialties);
  }

  update(id:any,specialties: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, specialties);
  }


  delete(id:any,): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  readAll(){
    return this.http.get<any>(this.baseUrl);
  }

  readById(id:any){
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
