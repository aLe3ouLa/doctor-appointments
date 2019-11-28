import { Component, OnInit, Input } from '@angular/core';
import { Medication } from 'src/app/shared/models/medication.model';

@Component({
  selector: 'app-medications-list',
  templateUrl: './medications-list.component.html',
  styleUrls: ['./medications-list.component.scss']
})
export class MedicationsListComponent implements OnInit {
  @Input() medications: Medication[];
  constructor() { }

  ngOnInit() {
  }

}
