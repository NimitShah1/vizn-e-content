// auth-guard.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  //   jwtHelper: JwtHelper = new JwtHelper();
  constructor(private router: Router) { }

  canActivate() {
    if (this.loggedIn()) {
      return true;
    }
    this.router.navigate(['/home/1'] );
    return false;
  }

  loggedIn() {
    // console.log('isLogin => ',localStorage.getItem('cui-data'))
    if (localStorage.getItem('cui-data') === null || localStorage.getItem('cui-data') === '' ) {
      return false;
    }
    return true;
  }
}
