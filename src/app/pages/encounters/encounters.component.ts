import { Component, OnInit } from '@angular/core';
import { Encounter } from '../../models/encounter';
import { EncountersService } from '../../services/encounters.service';

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.scss'],
  providers: [EncountersService],
})
export class EncountersComponent implements OnInit {

private ENCOUNTERS_URL = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';
encounters: Encounter[] = [];

constructor(private encounterService: EncountersService) {

}

  ngOnInit() {
      this.encounterService.getData().subscribe((data) => {
        this.encounters = data.encounters;
        console.log(data);
      });

  }

}
