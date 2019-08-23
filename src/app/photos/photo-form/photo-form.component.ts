import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlatformService } from 'src/app/core/platform-detector/platform-detector.service';
import { PhotoService } from '../photo/photo.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';
import { finalize } from 'rxjs/operators';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

const MSUCCESS = 'Photo uploaded!';
const MWARNING = 'Failed to upload!';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File; // para obter valores binarios do arquivo de foto 
  preview: string;
  percentDone = 0;

  @ViewChild('descriptionInput', {static: true}) descriptionInput: ElementRef<HTMLElement>;

  constructor(private formBuilder: FormBuilder,
              private photoService: PhotoService,
              private router: Router,
              private platformService: PlatformService,
              private alertService: AlertService,
              private userService: UserService) { }

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

  handleFile(file: File) {
    this.file = file;
    const fileReader = new FileReader();
    fileReader.onload = (event: any) => this.preview = event.target.result;
    fileReader.readAsDataURL(file);
  }

  upload() {
    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;
    console.log(description);
    console.log(allowComments);
    console.log(this.file);
    this.photoService
          .uploadPhotoFile(description, allowComments, this.file)
          .pipe(finalize(() => { // qnd processo finaliza navega para pagina do usuario
            this.router.navigate(['user', this.userService.getUserName()]);
          }))
          .subscribe(
            (event: HttpEvent<any>) => {
              if (event.type === HttpEventType.UploadProgress) { // constante do indice que indica que o httpvent esta fazendo o upload
                // realiza um calculo para mostrar a porcentagem no template
                this.percentDone = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) { // vem pra ca quando o porcentual foi concluido
                this.alertService.succes(MSUCCESS, true);
              }
            },
            err => {
              console.log(err);
              this.alertService.danger(MWARNING, true);
            }
          );
  }

}
