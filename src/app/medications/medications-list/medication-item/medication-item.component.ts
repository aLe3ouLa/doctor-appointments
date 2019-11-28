import { Component, OnInit, Input } from '@angular/core';
import { Medication } from 'src/app/shared/models/medication.model';

@Component({
  selector: 'app-medication-item',
  templateUrl: './medication-item.component.html',
  styleUrls: ['./medication-item.component.scss']
})
export class MedicationItemComponent implements OnInit {
@Input() medication: Medication;
  constructor() { }

  ngOnInit() {
  }

}
