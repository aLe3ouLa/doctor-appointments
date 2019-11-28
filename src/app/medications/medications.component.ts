import { Component, OnInit, Input } from '@angular/core';
import { Medication } from '../shared/models/medication.model';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.scss']
})
export class MedicationsComponent implements OnInit {
@Input() medications: Medication[];
createMed= false;
  constructor() { }

  ngOnInit() {
  }

  onCreateMedication() {

  }

}
