import { NgModule } from '@angular/core';
import { PhotoFormComponent } from './photo-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VMessageComponent } from 'src/app/shared/components/vmessage/vmessage.component';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';

@NgModule({
    declarations: [PhotoFormComponent],
    imports: [
                CommonModule, 
                VMessageModule,
                FormsModule, 
                ReactiveFormsModule]
})
export class PhotoFormModule {}

