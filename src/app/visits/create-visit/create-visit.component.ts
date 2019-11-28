import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VisitService } from 'src/app/shared/services/visits.service';
import { Visit } from 'src/app/shared/models/visit.model';
import { Patient } from 'src/app/shared/models/patient.model';

@Component({
  selector: 'app-create-visit',
  templateUrl: './create-visit.component.html',
  styleUrls: ['./create-visit.component.scss']
})
export class CreateVisitComponent implements OnInit {

  createVisitForm: FormGroup;
  @Input() patient: Patient;
  @Output() closeForm = new EventEmitter();
  constructor(private fb: FormBuilder, private visitService: VisitService) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.createVisitForm = this.fb.group({
      reasonOfVisit: [''],
      dateOfVisit: [''],
      consult: [''],
    });
  }

  onClickSubmit(reasonOfVisit, consult, dateOfVisit) {
    const visit: Visit = new Visit(null, reasonOfVisit, consult, this.patient._id, dateOfVisit, []);
    this.visitService.addVisit(visit);
    this.closeForm.emit(false);
  }
}
