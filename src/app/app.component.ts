import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormcontrolserviceService } from './services/formcontrolservice.service';

@Component({
  selector: 'app-root',  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
 
  title = 'Dynamic UI with Json';
  formJsonConfig!:JSON;
  formcontrolservice=inject(FormcontrolserviceService);
  ngOnInit(): void {
    this.formcontrolservice.getFormConfigJSON()
    .subscribe((formJsonConfig)=>{
      this.formJsonConfig=formJsonConfig;
      console.log(this.formJsonConfig);
    });
  }

}
