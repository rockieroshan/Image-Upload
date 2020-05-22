import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FileModel } from '../../model/file-model';
import { NotificationService } from '../../shared/notification/notification.service';
import { ManageImageService } from '../manage-image.service';

@Component({
  selector: 'app-add-img',
  templateUrl: './add-img.component.html',
  styleUrls: ['./add-img.component.scss']
})
export class AddImgComponent implements OnInit, OnDestroy {
  destroyPrevFileObj$: Subject<object> = new Subject<object>();
  images: any[] = [];
  allfiles: any[] = [];
  cols: { field: string; header: string }[];
  loading: boolean;
  displayBasic: boolean;
  selectedRowdata: FileModel;
  loadPrevFile: File;
  files: any;

  constructor(
    private router: Router,
    private manageImageService: ManageImageService,
    public msg: NotificationService
  ) {}

  ngOnInit() {
    this.manageImageService
      .getAllfiles()
      .pipe(takeUntil(this.destroyPrevFileObj$))
      .subscribe(file => (this.loadPrevFile = file));
    if (this.loadPrevFile) {
      this.fileuploads(this.loadPrevFile, false);
    }
    this.cols = [
      { field: 'url', header: 'Images' },
      { field: 'name', header: 'Name' },
      { field: 'type', header: 'Type' },
      { field: 'size', header: 'Size' },
      { field: 'action', header: 'Action' }
    ];
  }

  fileuploads(event, checkIfuplaoded) {
    this.loading = true;
    checkIfuplaoded
      ? (this.files = event.target.files)
      : (this.files = this.loadPrevFile);
    if (this.files) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.files.length; i++) {
        const image = {
          name: '',
          type: '',
          size: '',
          url: ''
        };
        this.allfiles.push(this.files[i]);
        const formatSize = this.files[i].size / 1000;
        image.name = this.files[i].name;
        image.type = this.files[i].type;
        image.size = `${formatSize}kb`;
        const reader = new FileReader();
        reader.onload = filedata => {
          image.url = reader.result + '';
          this.images.push(image);
        };
        reader.readAsDataURL(this.files[i]);
      }
    }
    if (checkIfuplaoded) {
      event.srcElement.value = null;
      this.msg.addMessageToNotification(
        'success',
        'Success',
        'File(s) Added Successfully'
      );
    }
    this.manageImageService.setAllfiles(this.allfiles);
    this.loading = false;
  }
  showBasicDialog(image: FileModel): void {
    this.displayBasic = true;
    this.selectedRowdata = image;
  }
  removeImage(): void {
    const index = this.images.indexOf(this.selectedRowdata);
    this.images.splice(index, 1);
    this.allfiles.splice(index, 1);
    this.displayBasic = false;
    this.msg.addMessageToNotification(
      'success',
      'Success',
      'File Removed Successfully'
    );
  }
  view(rowData: FileModel) {
    const checkSelectedfile = this.allfiles.filter(fileData => {
      return fileData.name === rowData.name && fileData.name === rowData.name;
    });
    this.manageImageService.setSelectedfile(checkSelectedfile);
    // tslint:disable-next-line:no-string-literal
    this.router.navigate(['/image/view', rowData['name']]);
  }

  ngOnDestroy() {
    this.destroyPrevFileObj$.unsubscribe();
  }
}
