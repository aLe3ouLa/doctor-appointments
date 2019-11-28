import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './patients/patients.component';
import { CreatePatientComponent } from './create-patient/create-patient.component';

const routes: Routes = [
    { path: '' , component: PatientsComponent},
    { path: 'patients' , component: PatientsComponent},
    { path: 'create-patient' , component: CreatePatientComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}