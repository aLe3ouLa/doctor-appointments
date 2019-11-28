import { Patient } from '../models/patient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
        this.http.get<Patient[]>('http://localhost:3000/api/patient')
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
        this.http.post('http://localhost:3000/api/patient', patient).subscribe(
            (patient: Patient) => {
                this.patients.push(patient);
                this.patientsUpdated.next([...this.patients]);
                this.router.navigate(['/patients']);
            }
        )
    }

    deletePatient(patientID: string) {
        this.http.delete('http://localhost:3000/api/patient/' + patientID)
            .subscribe(
                (data) => {
                    const index = this.patients.findIndex(p => p._id === patientID);
                    this.patients.splice(index, 1);
                    this.patientsUpdated.next([...this.patients]);
                    this.patientSelected.next(undefined);
                    this.router.navigate(['/patients']);
                }
            );

    }

    getPatient(patientID: string) {
        this.http.get('http://localhost:3000/api/patient/' + patientID);
    }

    updatePatient(patient: Patient) {
        //make request
        this.http.put('http://localhost:3000/api/patient/' + patient._id, patient)
        .subscribe(
            data => {
                console.log(data);
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