import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Alien } from '../models/alien';

@Injectable()
export class AliensService {

    private ALIENS_URL = 'https://red-wdp-api.herokuapp.com/api/mars/aliens';


  constructor(private http: Http) { }

getData() {
  return this.http.get(this.ALIENS_URL)
                  .map(this.extractAlien);
}
extractAlien(res: Response) {
  const aliens = res.json();
  return aliens;
  }
}


