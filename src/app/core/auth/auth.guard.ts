import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}
    /**
     * Protecao de rota, se usuario tiver logado nao devera
     * entrar na pagina de login e sera redirecionado para sua pagina
     */
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean|UrlTree> | Promise<boolean|UrlTree> {
        if (this.userService.isLogged()) {
            const userName = this.userService.getUserName();
            this.router.navigate(['user', userName]);
            return false;
        }
        return true;
    }
}
