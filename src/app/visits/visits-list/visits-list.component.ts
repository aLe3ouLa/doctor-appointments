import { Component, OnInit, Input } from '@angular/core';
import { Visit } from 'src/app/shared/models/visit.model';

@Component({
  selector: 'app-visits-list',
  templateUrl: './visits-list.component.html',
  styleUrls: ['./visits-list.component.scss']
})
export class VisitsListComponent implements OnInit {
  @Input() visits: Visit[];
  constructor() { }

  ngOnInit() {
  }

}
