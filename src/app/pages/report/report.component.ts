import { Component, OnInit } from '@angular/core';
import { Alien } from '../../models/alien';
import { AliensService } from '../../services/alien.service';
// import { Colonist } from '../../models/colonist';
import { Report } from '../../models/report';
// import { ColonistService } from '../../services/colonist.service';
import { ReportService } from '../../services/report.service';

import { Router } from '@angular/router/';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl
 } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [AliensService, ReportService]
})
export class ReportComponent implements OnInit {

  aliens: Alien[] = [];
  report: Report;
  reportForm: FormGroup;
  currentDate: Date;

  constructor(private alienService: AliensService,
              private reportService: ReportService,
              private router: Router,
              private FormBuilder: FormBuilder
              ) { }

  ngOnInit() {
      this.reportForm = new FormGroup({
        atype: new FormControl('', []),
        action: new FormControl('', [])
      });

      this.alienService.getData()
      .subscribe((data) => {
        this.aliens = data.aliens;
        console.log(data);
      });
      this.currentDate = new Date();
      console.log(this.currentDate);
      this.currentDate.getMonth();
  }
      postReport() {
        const report = new Report('', '', '', '');
        this.reportService.postData(report)
                          .subscribe((newReport) => {
                        });
      }
        reported(event) {
          event.preventDefault();
          const submitDate = `${this.currentDate.getFullYear()}-
                              ${('0' + (this.currentDate.getMonth() + 1)).slice(-2)}-
                              ${('0' + this.currentDate.getDate()).slice(-2)}:`;

          const colonist_id = window.localStorage.colonist_id;

          if (this.reportForm.invalid) {

          } else {
            const atype = this.reportForm.get('atype').value;
            const action = this.reportForm.get('action').value;

            const report = new Report(atype, submitDate, action, colonist_id);
            console.log(report);

            this.reportService.postData(report)
                              .subscribe((newReport) => {
                               this.router.navigate(['encounters']);
                                console.log(newReport);
                              });
          }
      }
}
