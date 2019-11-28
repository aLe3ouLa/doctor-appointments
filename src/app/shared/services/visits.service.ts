import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Visit } from '../models/visit.model';
import { Injectable } from '@angular/core';
import { PatientService } from './patient.service';

import { environment } from "../../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/visit/";

@Injectable({
    providedIn: 'root'
})
export class VisitService {
    private allVisits: Visit[] = [];

    allVisitUpdated = new Subject<Visit[]>();
    visitUpdated = new Subject<Visit[]>();

    constructor(private http: HttpClient, private patientService: PatientService) { }

    getVisitsForPatient(patientID: string) {
        this.http.get<Visit[]>(BACKEND_URL)
            .subscribe(
                (data) => {
                    let patientVisits  = data.filter(
                        d => d.patient == patientID
                    );
                    this.allVisits = patientVisits;
                    this.allVisitUpdated.next([...this.allVisits]);
                }
        );

    }

    getVisit(id: string) {
        let visit :Visit;
        this.http.get<Visit>(BACKEND_URL + id)
            .subscribe(
                (data) => {
                    visit = data;
                }
        );
        return visit;
    }

    addVisit(visit: Visit) {
        const visitTest = {
             reasonOfVisit: visit.reasonOfVisit, 
             consult: visit.consult, 
             patient: visit.patient, 
             dateOfVisit: visit.dateOfVisit, 
             prescribedMedication: []
        };
        this.http.post(BACKEND_URL, visitTest)
        .subscribe(
            (data: Visit) => {
                this.patientService.setVisitForPatient(data.patient, data._id);
                this.allVisits.push(data);
                this.allVisitUpdated.next([...this.allVisits]);
            }
        )
    }

    setMedicationForVisitForPatient(medID, visitID) {
        this.allVisits.forEach(
            v => {
                if (v._id === visitID) {
                    v.prescribedMedication.push(medID);
                    this.updateVisit(v);
                }
            }
        )
    }

    updateVisit(visit: Visit) {
        // PUT /api/visit/{id}
        this.http
        .put(BACKEND_URL + visit._id, visit)
        .subscribe(
            data => {
                console.log(data);
            }
        )
    }

    deleteVisit(visitID) {
        this.http.delete(BACKEND_URL + visitID)
        .subscribe(
            (data: Visit) => {
                const updatedVisits = this.allVisits.filter( v => v._id === visitID);
                this.allVisits = updatedVisits;
                this.patientService.deleteVisitFromPatient(data.patient, visitID);
                this.allVisitUpdated.next([...this.allVisits]);
            }
        );
    }

}