import { NgModule } from '@angular/core';
import { PhotoDetailsComponent } from './photo-details.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhotoModule } from '../photo/photo.module';

@NgModule({
    declarations: [PhotoDetailsComponent],
    exports: [PhotoDetailsComponent],
    imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                PhotoModule
             ]
})
export class PhotoDetailsModule {}
