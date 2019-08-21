import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../photo/photo.service';
import { Observable } from 'rxjs';
import { Photo } from '../photo/photo';
import { PhotoComments } from '../photo/photo-comments';

@Component({
    templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {
    photo$ = new Observable<Photo>();
    comments$ = new Observable<PhotoComments[]>();
    constructor(private rota: ActivatedRoute,
                private photoService: PhotoService) {}
    ngOnInit(): void {
        const id = this.rota.snapshot.params.photoID;
        this.photo$ = this.photoService.findById(id);
        this.comments$ = this.photoService.getComments(id);
    }
}
