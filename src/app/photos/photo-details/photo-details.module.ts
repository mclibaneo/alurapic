import { NgModule } from '@angular/core';
import { PhotoDetailsComponent } from './photo-details.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhotoModule } from '../photo/photo.module';
import { RouterModule } from '@angular/router';
import { PhotoCommentsComponent } from './photo-comments/photo-comments.component';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';

@NgModule({
    declarations: [PhotoDetailsComponent, PhotoCommentsComponent],
    exports: [PhotoDetailsComponent, PhotoCommentsComponent],
    imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                PhotoModule,
                RouterModule,
                VMessageModule
             ]
})
export class PhotoDetailsModule {}
