import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Visit } from '../shared/models/visit.model';
import { Patient } from '../shared/models/patient.model';
import { VisitService } from '../shared/services/visits.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss'],
})
export class VisitsComponent implements OnInit, OnDestroy {
  @Input() visits: Visit[];
  @Input() patient: Patient;
  private sub: Subscription;
  createVisit = false;
  constructor(private visitService: VisitService) { }

  ngOnInit() {
    this.sub = this.visitService.allVisitUpdated.subscribe(
      visitArray => {
        this.visits = visitArray;
      }
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onCloseForm() {
    this.createVisit = false;
  }

  onCreateVisit() {
    this.createVisit = true;
  }

}
