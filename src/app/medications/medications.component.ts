import { Component, OnInit, Input } from '@angular/core';
import { Medication } from '../shared/models/medication.model';
import { Subscription } from 'rxjs';
import { MedicationService } from '../shared/services/medication.service';
import { Visit } from '../shared/models/visit.model';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.scss']
})
export class MedicationsComponent implements OnInit {
  @Input() medications: Medication[];
  @Input() visit: Visit;
  private sub: Subscription;
  createMed = false;

  constructor(private medicationService: MedicationService) { }

  ngOnInit() {
    this.sub = this.medicationService.getMedicationUpdated()
    .subscribe(
      med => {
        this.medications = med;
      }
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onCloseForm() {
    this.createMed = false;
  }

  onCreateMedication() {
    this.createMed = true;
  }

}
