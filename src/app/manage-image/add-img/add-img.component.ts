import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-img',
  templateUrl: './add-img.component.html',
  styleUrls: ['./add-img.component.sass']
})
export class AddImgComponent implements OnInit {
  images: any = [];
  allfiles: any = [];
  cols: { field: string; header: string }[];
  constructor() {}

  ngOnInit() {
    this.cols = [
      { field: 'url', header: 'Images' },
      { field: 'name', header: 'Name' },
      { field: 'type', header: 'Type' },
      { field: 'size', header: 'Size' },
      { field: 'action', header: 'Action' }
    ];
  }
  fileuploads(event) {
    console.log(event);
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
  }
  deleteImage(image: any) {
    const index = this.images.indexOf(image);
    this.images.splice(index, 1);
    this.allfiles.splice(index, 1);
  }
  save() {}
  view(col) {
    console.log(col);
  }
}
