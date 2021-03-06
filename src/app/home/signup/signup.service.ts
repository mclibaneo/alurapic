import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewUser } from './newUser';
import { environment } from 'src/environments/environment';


const API_SERVER = environment.ApiUrl;
const API_URL_EXISTS = '/user/exists/';
const API_URL_SIGNUP = '/user/signup/';

@Injectable()
export class SignUpService {
    constructor(private httpClient: HttpClient) {}

    /**
     * verifica no backend se ja ha o nome de usario
     */
    checkUserNameTaken(userName: string) {
        return this.httpClient
                    .get(API_SERVER + API_URL_EXISTS + userName);
    }

    signup(newUser: NewUser) {
        return this.httpClient
                    .post(API_SERVER + API_URL_SIGNUP, newUser);
    }
}
