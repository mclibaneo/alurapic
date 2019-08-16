import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

/**
 * Este resolver ira tratar a rota
 * para que quando oelemnto for acesado
 * ele ja trara todas os dados prontos
 * sem precisar ter que carregados no onInit
 */
@Injectable({providedIn: 'root'})
export class PhotoListResolver implements Resolve<Observable<Photo[]>> {
    constructor(private service: PhotoService) {}
    resolve(route: ActivatedRouteSnapshot, 
            state: RouterStateSnapshot): Observable<Photo[]> | Observable<Observable<Photo[]>> | Promise<Observable<Photo[]>> {
        const userName = route.params.userNameParam;
        return this.service.listFromUserPaginated(userName, 1);
    }

    

}
