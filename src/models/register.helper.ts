export class RegisterHelper{
    fname!: string; 
    lname!: string;
    emailId!: string;
    password!: string;
    phno!: string;

    constructor(fname:string,lname:string,emailId:string,password:string,phno:string){
        this.fname=fname;
        this.lname=lname;
        this.emailId=emailId;
        this.password=password;
        this.phno=phno;
    }
}