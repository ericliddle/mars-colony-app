import { Component, OnInit } from '@angular/core';

import { Alien } from '../../models/alien';
import { AliensService } from '../../services/alien.service';
import { Colonist } from '../../models/colonist';
import { ColonistService } from '../../services/colonist.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [AliensService]
})
export class ReportComponent implements OnInit {

  aliens: Alien[];

  constructor(private alienService: AliensService) { }

  ngOnInit() {
      this.alienService.getData()
      .subscribe((data) => {
        this.aliens = data.aliens;
      })
  }


}
