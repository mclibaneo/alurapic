import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_SERVER = environment.ApiUrl;
const API_IMGS = '/imgs/';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ap-photo',
    templateUrl: 'photo.component.html'
})
export class PhotoComponent {
    @Input() description = '';
    private _url = '';

    // Inboud property para um setter
    @Input() set url(url: string) {

        if (url && url.startsWith('data')) {
            this._url = url;
        } else {
            this._url = API_SERVER + API_IMGS + url; // modifica o caminho da url
        }
    }

    get url() {
        return this._url;
    }
}
