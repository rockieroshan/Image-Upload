import { ConfirmationService } from 'primeng/api';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FileModel } from '../../model/file-model';
import { NotificationService } from '../../shared/notification/notification.service';
import { ManageImageService } from '../manage-image.service';

@Component({
  selector: 'app-add-img',
  templateUrl: './add-img.component.html',
  styleUrls: ['./add-img.component.scss'],
  providers: [ConfirmationService]
})
export class AddImgComponent implements OnInit {
  images: any[] = [];
  allfiles: any[] = [];
  cols: { field: string; header: string }[];
  loading: boolean;
  constructor(
    private router: Router,
    private manageImageService: ManageImageService,
    public msg: NotificationService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    // this.msg.addMessageToNotification(
    //   'error',
    //   'Error',
    //   'Please check your user-name/password'
    // );
    this.cols = [
      { field: 'url', header: 'Images' },
      { field: 'name', header: 'Name' },
      { field: 'type', header: 'Type' },
      { field: 'size', header: 'Size' },
      { field: 'action', header: 'Action' }
    ];
  }
  fileuploads(event) {
    this.loading = true;
    const files = event.target.files;
    if (files) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < files.length; i++) {
        const image = {
          name: '',
          type: '',
          size: '',
          url: ''
        };
        this.allfiles.push(files[i]);
        image.name = files[i].name;
        image.type = files[i].type;
        image.size = files[i].size;
        const reader = new FileReader();
        reader.onload = filedata => {
          image.url = reader.result + '';
          this.images.push(image);
        };
        reader.readAsDataURL(files[i]);
      }
    }
    event.srcElement.value = null;
    this.loading = false;
  }
  deleteImage(image: FileModel): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this file?',
      accept: () => {
        const index = this.images.indexOf(image);
        this.images.splice(index, 1);
        this.allfiles.splice(index, 1);
      }
    });
  }
  view(rowData: FileModel) {
    const checkSelectedfile = this.allfiles.filter(fileData => {
      return fileData.name === rowData.name && fileData.name === rowData.name;
    });

    this.manageImageService.setileObs(checkSelectedfile);
    // tslint:disable-next-line:no-string-literal
    this.router.navigate(['/image/view', rowData['name']]);
  }
}
