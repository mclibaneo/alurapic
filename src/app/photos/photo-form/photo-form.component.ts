import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlatformService } from 'src/app/core/platform-detector/platform-detector.service';
import { PhotoService } from '../photo/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File; // para obter valores binarios do arquivo de foto 

  @ViewChild('descriptionInput', {static: true}) descriptionInput: ElementRef<HTMLElement>;

  constructor(private formBuilder: FormBuilder,
              private photoService: PhotoService,
              private router: Router,
              private platformService: PlatformService) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group(
      {
        file: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.maxLength(300)]],
        allowComments: [true]
      });
    // tslint:disable-next-line: no-unused-expression
    this.platformService.isPlatformBrowser() &&
      this.descriptionInput.nativeElement.focus();
  }

  upload() {
    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;
    console.log(description);
    console.log(allowComments);
    console.log(this.file);
    this.photoService
          .uploadPhotoFile(description, allowComments, this.file)
          .subscribe(() => this.router.navigate(['']));
  }

}
