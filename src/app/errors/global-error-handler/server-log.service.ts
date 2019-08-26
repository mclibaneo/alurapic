import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ServerLog } from './serverLog';

const LOG_SERVER_API = environment.ServerLogUrl;
const LOG_SERVER_ENDPOINT = '/infra/log';

@Injectable({providedIn: 'root'})
export class ServerLogService {

    constructor(private httpClient: HttpClient) {}

    log(serverLog: ServerLog) {
        return this.httpClient.post(LOG_SERVER_API + LOG_SERVER_ENDPOINT, serverLog);
    }
}
