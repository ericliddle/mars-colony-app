import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Report } from '../models/report';

@Injectable()
export class ReportService {

    private COLONIST_URL = 'https://red-wdp-api.herokuapp.com/api/mars/reports';


  constructor(private http: Http) { }

postData() {
  const headers = new Headers({ 'Content-Type': 'application/json'});
  const options = new RequestOptions({ headers });
  return this.http.post(this.COLONIST_URL, {}, options)
          .map(this.extractData);

}

extractData(res: Response) {
  const report = res.json();
  return report;
}

   }


