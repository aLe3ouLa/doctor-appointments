import { Component, OnInit, OnDestroy } from '@angular/core';
import { PatientService } from 'src/app/shared/services/patient.service';
import { Patient } from 'src/app/shared/models/patient.model';
import { Visit } from 'src/app/shared/models/visit.model';
import { VisitService } from 'src/app/shared/services/visits.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {
  
  selectedPatient: Patient;
  selectedPatientVisits: Visit[] = [];
  constructor(private patientService: PatientService,
    private visitService: VisitService) { }

  ngOnInit() {
    this.patientService.patientSelected.subscribe(
      (patient: Patient) => {
        this.selectedPatient = patient;
        this.visitService.getVisitsForPatient(this.selectedPatient._id);
        this.visitService.allVisitUpdated.subscribe(
          data => this.selectedPatientVisits = data
        )
      }
    )
  }

  _calculateAge(birthday) { 
    return this.patientService.calculatePatientAge(birthday);
  }

  _makeDateReadable(date) {
    const birth = new Date(date);
    return birth.toDateString();
  }

  onDelete(patient) {
    this.patientService.deletePatient(patient._id);
  }


}
