import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoComments } from '../../photo/photo-comments';
import { PhotoService } from '../../photo/photo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit {
    
    @Input() photoId: number;
    comments$: Observable<PhotoComments[]>;
    commentForm: FormGroup;
    
    constructor(private photoService: PhotoService, private formBuilder: FormBuilder) {}
    
    ngOnInit(): void {
        this.comments$ = this.photoService.getComments(this.photoId);
        this.commentForm = this.formBuilder.group({
               comment:  ['', [Validators.required, Validators.maxLength(300)]]
        });
    }

    /**
     * adiciona um comentario na foto de acordo com o ID
     * realiza um update na lista p/ assim q comentar o comentario eh exibido na foto
     * 
     * switchMap -> muda o fluxo da acao, ou seja, antes de consumir o observable, 
     * realiza o update de comments
     * 
     * tap -> aqui executa um unico codigo, antes do observable ser consumido
     * 
     */
    addCommentInPhoto() {
        const comment = this.commentForm.get('comment').value as string;
        this.comments$ = this.photoService
                .addComment(this.photoId, comment)
                .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
                .pipe(tap(() => this.commentForm.reset() ));
        }
}
