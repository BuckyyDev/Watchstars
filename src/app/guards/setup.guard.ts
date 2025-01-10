import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { config } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class SetupGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (config.freshInstall) {
      this.router.navigate(['/setup']);
      return false;
    }
    return true;
  }
}