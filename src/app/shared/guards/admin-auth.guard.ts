import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService : AuthService, private router: Router) {
    
    
  }
  canActivate() {
  const  userrole = this.authService.getUserRole();
    if(userrole === 'ADMIN'){
      return true;
    } else{
      this.router.navigate(['/unauthorized-error']);
      return false;
    }
    
  }
}
