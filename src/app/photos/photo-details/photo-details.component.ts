import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../photo/photo.service';
import { Observable } from 'rxjs';
import { Photo } from '../photo/photo';
import { PhotoComments } from '../photo/photo-comments';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';


const MSUCESS = 'Photo Removed!';
const MWARNING = 'Failed to Remove!';

@Component({
    templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {
    photoId: number;
    photo$ = new Observable<Photo>();
    comments$ = new Observable<PhotoComments[]>();
    
    constructor(private rota: ActivatedRoute,
                private photoService: PhotoService,
                private router: Router,
                private alertService: AlertService,
                private userService: UserService) {}
    
    ngOnInit(): void {
        this.photoId = this.rota.snapshot.params.photoID;
        this.photo$ = this.photoService.findById(this.photoId);
        this.photo$.subscribe(
            () => {},
            err => {
                console.log(err);
                this.router.navigate(['not-found']);
            }
        );
    }

    removePhoto() {
        this.photoService
                .removePhoto(this.photoId)
                .subscribe(
                    // callback de sucesso
                    () => {
                            this.alertService.succes(MSUCESS, true);
                            this.router.navigate(['/user', this.userService.getUserName()]);
                    },
                    // calback de erro
                    err => {
                        this.alertService.warning(MWARNING);
                        console.log(err);
                    }
                );
    }
}
