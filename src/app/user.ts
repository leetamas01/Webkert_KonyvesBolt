export interface User {
   name: {
    firstname: string;
    lastname: string;
   };
   email: string;
   password: string;
   tasks: any[];
   completed_taks: any[];
}
