import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean|UrlTree> | Promise<boolean|UrlTree> {
       if (!this.userService.isLogged()) {
           this.router.navigate(
               [''],
               { // este segundo param obtem a url de navegacao para repassar para outro componente
                    queryParams: {
                        fromUrl: state.url
               }
           });
           return false;
       } else {
           return true;
       }
    }
}
