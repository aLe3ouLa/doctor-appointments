
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Medication } from '../models/medication.model';

@Injectable({
    providedIn: 'root'
})
export class MedicationService {
    private medication: Medication;
    private medicationUpdated = new Subject<Medication>();

    constructor(private http: HttpClient) { }

    getMedication(med) {
        this.http.get<Medication>('http://localhost:3000/api/medication/' + med._id)
            .subscribe(
                (data) => {
                    this.medication = data;
                    this.medicationUpdated.next(this.medication);
                }
            );
        return this.medication;
    }

    getMedicationUpdated() {
        return this.medicationUpdated.asObservable();
    }

}