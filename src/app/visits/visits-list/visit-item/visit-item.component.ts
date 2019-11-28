import { Component, OnInit, Input } from '@angular/core';
import { Visit } from 'src/app/shared/models/visit.model';
import { Medication } from 'src/app/shared/models/medication.model';
import { MedicationService } from 'src/app/shared/services/medication.service';
import { VisitService } from 'src/app/shared/services/visits.service';

@Component({
  selector: 'app-visit-item',
  templateUrl: './visit-item.component.html',
  styleUrls: ['./visit-item.component.scss']
})
export class VisitItemComponent implements OnInit {
  @Input() visit: Visit;
  selectedPatientMedication: Medication[] = [];
  constructor(private medicationService: MedicationService, private visitService: VisitService) { }

  ngOnInit() {
    this.selectedPatientMedication = [];
    this.visit.prescribedMedication.forEach(
      (med) => {
        const medication: Medication = this.medicationService.getMedication(med);
        if (medication !== undefined) {
          this.selectedPatientMedication.push(medication);
        }
      }
    );
  }

  _makeDateReadable(date) {
    const birth = new Date(date);
    return birth.toDateString();
  }

  onDelete() {
    this.visitService.deleteVisit(this.visit._id);
  }

}
