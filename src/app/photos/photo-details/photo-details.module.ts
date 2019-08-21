import { NgModule } from '@angular/core';
import { PhotoDetailsComponent } from './photo-details.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhotoModule } from '../photo/photo.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [PhotoDetailsComponent],
    exports: [PhotoDetailsComponent],
    imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                PhotoModule,
                RouterModule
             ]
})
export class PhotoDetailsModule {}
