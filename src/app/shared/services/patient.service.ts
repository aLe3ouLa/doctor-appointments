import { Patient } from '../models/patient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from "../../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/patient/";

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    private patients: Patient[] = [];
    private patientsUpdated = new Subject<Patient[]>();
    patientSelected = new Subject<Patient>();

    constructor(private http: HttpClient, private router: Router) { }

    setVisitForPatient(patient, visitid) {
        this.patients.forEach(
            p => {
                if (p._id === patient) {
                    p.visits.push(visitid);
                    this.updatePatient(p);
                }
            }
        )
    }

    deleteVisitFromPatient(patient, visitid) {
        this.patients.forEach(
            p => {
                if (p._id === patient) {
                    const index = p.visits.findIndex(v => v === visitid);
                    p.visits.splice(index, 1);
                    this.updatePatient(p);
                }
            }
        )
    }

    getPatients() {
        this.http.get<Patient[]>(BACKEND_URL)
            .subscribe(
                (data) => {
                    this.patients = data;
                    this.patientsUpdated.next([...this.patients]);
                }
            );
        return [...this.patients];
    }

    getPatientsLength() {
        return this.patients.length;
    }

    getPatientsUpdated() {
        return this.patientsUpdated.asObservable();
    }

    addPatient(patient: Patient) {
        this.http.post(BACKEND_URL, patient).subscribe(
            (patient: Patient) => {
                this.patients.push(patient);
                this.patientsUpdated.next([...this.patients]);
                this.router.navigate(['/patients']);
            }
        )
    }

    deletePatient(patientID: string) {
        // GET /api/patient/{id}
        this.http.delete(BACKEND_URL + patientID)
            .subscribe(
                (data) => {
                    const updatedPatients = this.patients.filter( p => p._id !== patientID);
                    this.patients = updatedPatients;
                    this.patientsUpdated.next([...this.patients]);
                    this.patientSelected.next(undefined);
                    this.router.navigate(['/patients']);
                }
            );

    }

    getPatient(patientID: string) {
        // GET /api/patient/{id}
        return this.http.get(BACKEND_URL + patientID);
    }

    updatePatient(patient: Patient) {
        // PUT /api/patient/{id}
        this.http
        .put(BACKEND_URL + patient._id, patient)
        .subscribe(
            data => {
                console.log(data);
                this.router.navigate(["/"]);
            }
        )
    }

    calculatePatientAge(birthday: string) {
        var birthDate = new Date(birthday);
        var ageDifMs = Date.now() - birthDate.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}