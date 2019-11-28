import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/shared/models/patient.model';
import { Subscription } from 'rxjs';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  patients: Patient[];
  private patientSubscription:Subscription;
  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.patientService.getPatients();
    this.patientSubscription = this.patientService.getPatientsUpdated()
    .subscribe(
      (data) => {
        this.patients = data;
      }
    );
  }

  onPatientSelected(patient){
    this.patientService.patientSelected.next(patient);
  }

}
