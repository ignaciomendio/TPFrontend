import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  async login (email: string, password: string){
    try{ 
      return await this.angularFireAuth.signInWithEmailAndPassword(email, password);

    } catch(e){
      console.log("error en Login",e);
      return null;

    }
  }
}
