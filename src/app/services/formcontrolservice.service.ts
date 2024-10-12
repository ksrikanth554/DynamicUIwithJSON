import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FormcontrolserviceService {

  constructor(private httpClient:HttpClient) { }

  getFormConfigJSON():Observable<any>{
    return this.httpClient.get('/assets/formData.json');
  }
  createForm(jsonConfig:any):FormGroup{
    const formGroup:FormGroup=new FormGroup({});
    jsonConfig.fields.forEach((field:any) => {
      formGroup.addControl(
        field.id,
        new FormControl(field.value||'',this.getValidators(field))
      )
    });
    return formGroup;
  }
  private getValidators(field:any){
    const validators=[];
    if (field.required) {
      validators.push(Validators.required)
    }
    return validators;
  }
}


