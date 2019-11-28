export class Visit {
    constructor(
        public _id: string,
        public reasonOfVisit: string, 
        public consult: string, 
        public patient: string, 
        public dateOfVisit: Date, 
        public prescribedMedication: string[]) { }
}