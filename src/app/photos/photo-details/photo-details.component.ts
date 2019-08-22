import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../photo/photo.service';
import { Observable } from 'rxjs';
import { Photo } from '../photo/photo';
import { PhotoComments } from '../photo/photo-comments';

@Component({
    templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {
    photoId: number;
    photo$ = new Observable<Photo>();
    comments$ = new Observable<PhotoComments[]>();
    
    constructor(private rota: ActivatedRoute,
                private photoService: PhotoService,
                private router: Router) {}
    
    ngOnInit(): void {
        this.photoId = this.rota.snapshot.params.photoID;
        this.photo$ = this.photoService.findById(this.photoId);
    }

    removePhoto() {
        this.photoService
                .removePhoto(this.photoId)
                .subscribe(() => this.router.navigate(['']));
    }
}
