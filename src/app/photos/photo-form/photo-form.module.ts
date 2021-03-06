import { NgModule } from '@angular/core';
import { PhotoFormComponent } from './photo-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { PhotoModule } from '../photo/photo.module';
import { ImmediateClickModule } from 'src/app/shared/directives/immeditate-click/immeditate-click.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [PhotoFormComponent],
    imports: [
                CommonModule,
                PhotoModule,
                VMessageModule,
                FormsModule,
                ReactiveFormsModule,
                RouterModule,
                ImmediateClickModule]
})
export class PhotoFormModule {}

