export class Patient {
    constructor(
        public _id: string,
        public firstName: string, 
        public lastName: string, 
        public address: string, 
        public dateOfBirth: Date, 
        public visits: string[]) { }
}