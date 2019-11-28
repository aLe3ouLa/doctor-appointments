import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Patient } from '../shared/models/patient.model';
import { PatientService } from '../shared/services/patient.service';


@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.scss']
})
export class CreatePatientComponent implements OnInit {
  createPatientForm: FormGroup;
  constructor(private fb: FormBuilder, private patientService: PatientService) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.createPatientForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      address: [''],
      dateOfBirth: ['']
    });
  }

  onClickSubmit(firstName, lastName, address, dateOfBirth) {
    const patient: Patient = new Patient(null, firstName, lastName, address, dateOfBirth, []);
    this.patientService.addPatient(patient);
  }

}
