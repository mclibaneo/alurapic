import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private tokenServie: TokenService) {}

    /**
     * intercept uma requiscao
     * se tiver token clona a requisicao e passa para frente
     */
    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.tokenServie.hasToken()){
            const token = this.tokenServie.getToken();
            req = req.clone({
                setHeaders: {'x-access-token': token}
            });
        }
        return next.handle(req);

    }
}
