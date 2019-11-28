
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Medication } from '../models/medication.model';

import { environment } from "../../../environments/environment";
import { VisitService } from './visits.service';

const BACKEND_URL = environment.apiUrl + "/medication/";

@Injectable({
    providedIn: 'root'
})
export class MedicationService {
    private medications: Medication[] = [];
    private medicationUpdated = new Subject<Medication[]>();

    constructor(private http: HttpClient, private visitService: VisitService) { }


    addMedication (medication: Medication, visitID) {
        const medicationTest = {
            name: medication.name, 
            dose: medication.dose, 
            packageSize: medication.packageSize, 
       };
       this.http.post(BACKEND_URL, medicationTest)
       .subscribe(
           (data: Medication) => {
               this.visitService.setMedicationForVisitForPatient(data._id, visitID);
               this.medications.push(data);
               this.medicationUpdated.next([...this.medications]);
           }
       )
    }

    getMedicationsPerVisit(prescribedMedications: string[]) {
        this.http.get<Medication[]>(BACKEND_URL)
            .subscribe(
                (data) => {
                    console.log(prescribedMedications);
                    prescribedMedications.forEach(element => {
                        const prMed = data.filter(m => m._id === element);
                        prMed.forEach(p => this.medications.push(p));
                        
                    });
                    this.medicationUpdated.next([...this.medications]);
                }
        );
    }

    getMedicationUpdated() {
        return this.medicationUpdated.asObservable();
    }

}