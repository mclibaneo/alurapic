import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Photo } from './photo';


const API_SERVER = 'http://localhost:3000/';
const API_ENDPOINT = '/photos';

// o Injectable do tipo root indica que nosso service
// esta no escopo raiz, qlqr componente pode usa-lo
@Injectable({
    providedIn: 'root'
})
export class PhotoService {

    // o httpClient para funcionar depende do
    // HttpClientModule listado no PhotoModule
    constructor(private httpClient: HttpClient) {}

    listFromUser(userName: string) {
        // o .get retorna um objeto Observable
        // tipamos o retorno do .get para Photo[]
        // nao possui ainda os objetos do json
        return this
                .httpClient
                .get<Photo[]>(API_SERVER + userName + API_ENDPOINT);
    }

    listFromUserPaginated(userName: string, page: number) {
        const params = new HttpParams().append('page', page.toString());
        return this.httpClient
                        .get<Photo[]>(API_SERVER + userName + API_ENDPOINT , { params });
    }
}
