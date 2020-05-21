import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CdkDragMove } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';

import { ManageImageService } from '../manage-image.service';

@Component({
  selector: 'app-view-img',
  templateUrl: './view-img.component.html',
  styleUrls: ['./view-img.component.scss']
})
export class ViewImgComponent implements OnInit, OnDestroy {
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('redCircle') redCircle: ElementRef;
  destroyMouseEvent$: Subject<boolean> = new Subject<boolean>();
  destroyFileObj$: Subject<object> = new Subject<object>();
  model: any = {};
  context: CanvasRenderingContext2D;
  displayBasic: boolean;
  customerName: string;
  customerLocation: string;
  uploadedFiles: any[] = [];
  Xoffset: number;
  Yoffset: number;
  circleJson: any[] = [];
  count: any[] = [];
  selectedfileobj: any;

  constructor(
    private manageImageService: ManageImageService,
    private router: Router
  ) {}
  ngOnInit() {
    this.count = [];
    this.customerName = '';
    this.customerLocation = '';
    this.manageImageService
      .getSelectedfile()
      .pipe(takeUntil(this.destroyFileObj$))
      .subscribe(file => (this.selectedfileobj = file));
    if (!this.selectedfileobj) {
      this.router.navigate(['/image/add']);
    } else {
      this.onUpload(this.selectedfileobj);
      // tslint:disable-next-line:no-string-literal
      this.circleJson['fileName'] = this.selectedfileobj[0].name;
    }
  }
  onUpload(e: any): void {
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    const render = new FileReader();
    render.onload = event => {
      const img = new Image();
      img.onload = () => {
        const canvasWidth = canvas.width;
        const canvasNaturalwidth = img.naturalWidth;
        const canvasNaturalheight = img.naturalHeight;
        const aspect = canvasNaturalwidth / canvasNaturalheight;
        const totalHeight = canvasWidth / aspect;
        canvas.height = totalHeight;
        context.drawImage(img, 0, 0, canvasWidth, totalHeight);
      };
      // tslint:disable-next-line:no-string-literal
      img.src = (event.target as FileReader).result as string;
    };
    render.readAsDataURL(e[0]);
  }
  createCircle(): void {
    this.count.push(1);
  }
  showBasicDialog(): void {
    this.displayBasic = true;
  }
  AddData(): void {
    const currentAxis = {
      xAxis: this.Xoffset,
      yAxis: this.Yoffset,
      Name: this.model.customerName,
      Location: this.model.customerLocation
    };
    console.log('this.circleJson:', this.circleJson);
    this.circleJson.push(currentAxis);
    this.displayBasic = false;
  }
  dragMoved(event: CdkDragMove) {
    this.Xoffset = event.pointerPosition.x;
    this.Yoffset = event.pointerPosition.y;
  }
  ngOnDestroy() {
    this.destroyFileObj$.unsubscribe();
  }
}
