import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/shared/models/patient.model';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-patient-item',
  templateUrl: './patient-item.component.html',
  styleUrls: ['./patient-item.component.scss']
})
export class PatientItemComponent implements OnInit {
  @Input() patient: Patient;
  constructor(private patientService: PatientService) { }

  ngOnInit() {
  }

  _calculateAge(birthday) {
    return this.patientService.calculatePatientAge(birthday);
  }

}
