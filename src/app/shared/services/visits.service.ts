import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Visit } from '../models/visit.model';
import { Injectable } from '@angular/core';
import { PatientService } from './patient.service';

@Injectable({
    providedIn: 'root'
})
export class VisitService {
    private visits: Visit[] = [];
    private allVisits: Visit[] = [];

    allVisitUpdated = new Subject<Visit[]>();
    visitUpdated = new Subject<Visit[]>();

    constructor(private http: HttpClient, private patientService: PatientService) { }

    getVisitsForPatient(patientID: string) {
        console.log(patientID)
        this.http.get<Visit[]>('http://localhost:3000/api/visit')
            .subscribe(
                (data) => {
                    console.log(data)
                    let patientVisits  = data.filter(
                        d => d.patient == patientID
                    )
                    console.log(patientVisits)
                    this.allVisits = patientVisits;
                    this.allVisitUpdated.next([...this.allVisits]);
                }
        );

    }

    getVisit(id: string) {
        let visit :Visit;
        this.http.get<Visit>('http://localhost:3000/api/visit/' + id)
            .subscribe(
                (data) => {
                    visit = data;
                }
        );
        return visit;
    }

    getMultipleVisits(visits: string[]) {
        visits.forEach(
            id => {
                this.http.get<Visit>('http://localhost:3000/api/visit/' + id)
                .subscribe(
                    (data) => {
                        this.visits.push(data)
                    }
            );
            }
        );
        return [...this.visits];
    }

    addVisit(visit: Visit) {
        const v = {
             reasonOfVisit: visit.reasonOfVisit, 
             consult: visit.consult, 
             patient: visit.patient, 
             dateOfVisit: visit.dateOfVisit, 
             prescribedMedication: []
        };
        this.http.post('http://localhost:3000/api/visit', v)
        .subscribe(
            (data: Visit) => {
                this.patientService.setVisitForPatient(data.patient, data._id);
                this.allVisits.push(data);
                this.visitUpdated.next([...this.allVisits]);
            }
        )
    }

    deleteVisit(visitID) {
        this.http.delete('http://localhost:3000/api/visit/' + visitID)
        .subscribe(
            (data: Visit) => {
                const index = this.allVisits.findIndex(v => v._id === visitID);
                this.allVisits.splice(index, 1);
                this.patientService.deleteVisitFromPatient(data.patient, data._id)
                this.allVisitUpdated.next([...this.allVisits])
            }
        );
    }

}