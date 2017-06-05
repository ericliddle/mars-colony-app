import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { JobsService } from '../../services/jobs.service';
import { Colonist } from '../../models/colonist';
import { ColonistService } from '../../services/colonist.service';
import { Router } from '@angular/router/';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl
 } from '@angular/forms';

const cantBe = (value: string): ValidatorFn => {
  return (control: AbstractControl) => {
      return control.value === value ? { 'Cant\'be this value': value } : null;
  };
};

const age = (tooYoung: number, tooOld: number): ValidatorFn => {
  if (tooYoung < 0 || tooOld < 0) {
    throw new Error('You can\'t be negative age...');
  }
  return (control: AbstractControl) => {
    return control.value < 0 || control.value < tooYoung || control.value > tooOld ?
      { 'You\'re not the right age...': age } : null;
  };
};

@Component({
  selector: 'app-jobs',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [JobsService, ColonistService]
})
export class RegisterComponent implements OnInit {

jobs: Job[] = [];
colonist: Colonist;
registerForm: FormGroup;
NO_JOB_SELECTED = 'no job';

  constructor(private jobService: JobsService,
              private colonistService: ColonistService,
              private router: Router,
              private FormBuilder: FormBuilder
              ) { }
  ngOnInit() {
   this.jobService.getData()
    .subscribe((data) => {
      this.jobs = data.jobs;
      console.log(data);
   });

  this.registerForm = new FormGroup ({
      name: new FormControl('',
      [ Validators.required,
        Validators.maxLength(100),
        Validators.minLength(3)
        ]),
      age: new FormControl('', [Validators.required, age(16,35)]),
      job_id: new FormControl(this.NO_JOB_SELECTED, [cantBe(this.NO_JOB_SELECTED)]),
  }); console.log(age);
}

  // postColonist() {
  //   const colonist = new Colonist ('','','');
  //   this.colonistService.postData(colonist)
  //                       .subscribe((newColonist) => {
  //                       console.log(newColonist);
  //   });console.log(colonist);
  // }


register(e) {
  e.preventDefault();
  if (this.registerForm.invalid) {
  } else {
    console.log('');
    const name = this.registerForm.get('name').value;
    console.log(name);
    const age = this.registerForm.get('age').value;
    console.log(age);
    const job_id = this.registerForm.get('job_id').value;
    console.log(job_id);

    const colonist = new Colonist(name, age, job_id);
      this.colonistService.postData(colonist).subscribe(data => {
        this.router.navigate(['encounters']);
        window.localStorage.setItem('colonist_id', data.colonist.id);
      })
   }
  }
}