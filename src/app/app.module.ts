import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PatientsComponent } from './patients/patients.component';

import { HttpClientModule } from '@angular/common/http';
import { PatientItemComponent } from './patients/patient-list/patient-item/patient-item.component';
import { CreatePatientComponent } from './create-patient/create-patient.component';
import { AppRoutingModule } from './app-routing.module';
import { PatientDetailsComponent } from './patients/patient-details/patient-details.component';
import { PatientListComponent } from './patients/patient-list/patient-list.component';
import { VisitsComponent } from './visits/visits.component';
import { VisitsListComponent } from './visits/visits-list/visits-list.component';
import { VisitItemComponent } from './visits/visits-list/visit-item/visit-item.component';
import { MedicationsComponent } from './medications/medications.component';
import { MedicationsListComponent } from './medications/medications-list/medications-list.component';
import { MedicationItemComponent } from './medications/medications-list/medication-item/medication-item.component';
import { CreateVisitComponent } from './visits/create-visit/create-visit.component';
import { SearchPipe } from './shared/pipes/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PatientsComponent,
    PatientItemComponent,
    CreatePatientComponent,
    PatientDetailsComponent,
    PatientListComponent,
    VisitsComponent,
    VisitsListComponent,
    VisitItemComponent,
    MedicationsComponent,
    MedicationsListComponent,
    MedicationItemComponent,
    CreateVisitComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
