import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ApiService } from './api.service';
function emailDomainValidator(domain: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email: string = control.value;
    const domainPattern: RegExp = new RegExp(`@${domain}$`, 'i');

    if (!domainPattern.test(email)) {
      return { 'invalidDomain': true };
    }
    return null;
  };
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private addressSer:ApiService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      landmark: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, emailDomainValidator('gmail.com')]] ,
      mobile: ['', Validators.required],
      pin: ['', Validators.required],
    });
  }

 
  onSubmit() {
    var data=this.contactForm.value;
    this.addressSer.get(data).subscribe(res=>{
      console.log(res);
    })
  }
 

}
