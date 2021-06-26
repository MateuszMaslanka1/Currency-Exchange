import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {LoginData} from '../Model/login-data';
import {Observable, of} from 'rxjs';
import firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false;
  getApiKey: firebase.auth.UserCredential;
  readonly authState$: Observable<User | null> = this.firebaseAuth.authState;
  constructor(private firebaseAuth: AngularFireAuth) { }

   async signin(getCredensial: LoginData) {
     this.getApiKey = await this.firebaseAuth.signInWithEmailAndPassword(getCredensial.email, getCredensial.password);

     of(this.getApiKey).subscribe((el: UserCredential) => {
       console.log(el.user);
       localStorage.setItem('user', JSON.stringify(el.user));
     });
  }

  async singup(emial: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(emial, password).then(
      res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      }
    );
  }

  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }

}
