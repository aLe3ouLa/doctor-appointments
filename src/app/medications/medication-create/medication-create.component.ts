import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Medication } from 'src/app/shared/models/medication.model';
import { MedicationService } from 'src/app/shared/services/medication.service';

@Component({
  selector: 'app-medication-create',
  templateUrl: './medication-create.component.html',
  styleUrls: ['./medication-create.component.scss']
})
export class MedicationCreateComponent implements OnInit {

  createMedicationForm: FormGroup;
  @Output() closeForm = new EventEmitter();
  constructor(private fb: FormBuilder, private medicationService: MedicationService) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.createMedicationForm = this.fb.group({
      name: [''],
      dose: [''],
      packageSize: [''],
    });
  }

  onClickSubmit(name, dose, packageSize) {
    const medication: Medication = new Medication(null, name, dose, packageSize);
    this.medicationService.addMedication(medication);
    this.closeForm.emit(false);
  }

}
