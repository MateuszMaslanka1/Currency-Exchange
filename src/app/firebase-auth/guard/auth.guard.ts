import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {FirebaseService} from '../Services/firebase.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private , private firebaseService: FirebaseService) {
  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.authState$.pipe(map(state => {
        if (state !== null) { return true; }
          this.router.navigate(['/login']);
          return false;
        }
      )
    );
    return true;
  }

}
