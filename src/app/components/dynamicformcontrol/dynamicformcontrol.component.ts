import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormcontrolserviceService } from '../../services/formcontrolservice.service';

@Component({
  selector: 'app-dynamicformcontrol',  
  templateUrl: './dynamicformcontrol.component.html',
  styleUrl: './dynamicformcontrol.component.css'
})
export class DynamicformcontrolComponent implements OnInit,OnChanges {
  constructor(private formcontrolservice:FormcontrolserviceService,private cdr: ChangeDetectorRef){}
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  @Input() jsonConfig:any;
  form!:FormGroup;
  
  ngOnInit(): void {
    this.form=this.formcontrolservice.createForm(this.jsonConfig);
    this.cdr.detectChanges();
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    this.form.statusChanges.subscribe((status) => {
      console.log('Form status changes:', status);
    });
  }
  onSubmit(){  
    // Object.keys(this.form.controls).forEach(key => {
    //   this.form.controls[key].setErrors(null);
    // });
    // Object.keys(this.form.controls).forEach(key => {
    //   this.form.controls[key].setErrors({ invalid: true });
    // });
    this.form.markAllAsTouched();
  this.form.updateValueAndValidity();
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);

    }
    //console.log(this.form.value);
  }
  
  

}
