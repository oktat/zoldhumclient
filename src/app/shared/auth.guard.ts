import { CanActivateFn } from '@angular/router';
import { AuthapiService } from './authapi.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthapiService);
  if(!authService.isLoggedIn()) {
    return false;
  }
  return true;
};
