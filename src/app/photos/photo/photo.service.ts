import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Photo } from './photo';
import { Observable } from 'rxjs';
import { PhotoComments } from './photo-comments';


const API_SERVER = 'http://localhost:3000/';
const API_ENDPOINT = '/photos';
const API_GET_PHOTO = 'photos/';
const API_GET_COMMENTS = '/comments';
const API_UPLOAD_PHOTO = 'photos/upload';

// o Injectable do tipo root indica que nosso service
// esta no escopo raiz, qlqr componente pode usa-lo
@Injectable({ providedIn: 'root' })
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

    uploadPhotoFile(description: string, allowComments: boolean, file: File) {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true' : 'false');
        formData.append('imageFile', file); // conforme exigido pelo backend da API
        return this.httpClient.post(API_SERVER + API_UPLOAD_PHOTO, formData);
    }
    findById(photoId: number): Observable<Photo> {
        return this.httpClient.get<Photo>(API_SERVER + API_GET_PHOTO + photoId);
    }

    // retorna um array de comentarios
    getComments(photoId: number) {
        return this.httpClient.get<PhotoComments[]>(API_SERVER + API_GET_PHOTO + photoId + API_GET_COMMENTS );
    }

    addComment(photoId: number, commentText: string) {
        return this.httpClient.post(API_SERVER + API_GET_PHOTO + photoId + API_GET_COMMENTS, {commentText});
    }

    removePhoto(photoId: number) {
        return this.httpClient.delete(API_SERVER + API_GET_PHOTO + photoId);
    }
}
