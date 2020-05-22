import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CdkDragEnd } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';

import { ManageImageService } from '../manage-image.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-view-img',
  templateUrl: './view-img.component.html',
  styleUrls: ['./view-img.component.scss']
})
export class ViewImgComponent implements OnInit, OnDestroy {
  @ViewChild('canvas') canvas: ElementRef;
  destroyFileObj$: Subject<object> = new Subject<object>();
  initialPosition = { x: 738, y: 52 };
  position = { ...this.initialPosition };
  offset = { x: 0, y: 0 };
  model: any = {};
  context: CanvasRenderingContext2D;
  displayBasic: boolean;
  customerName: string;
  customerLocation: string;
  uploadedFiles: any[] = [];
  Xposition: number;
  Yposition: number;
  circleJson: any[] = [];
  count: any[] = [];
  selectedfileobj: File;
  isCircleCreated: boolean;
  loading: boolean;

  constructor(
    private manageImageService: ManageImageService,
    private router: Router,
    public msg: NotificationService
  ) {}
  ngOnInit() {
    this.loading = true;
    this.count = [];
    this.customerName = '';
    this.customerLocation = '';
    this.isCircleCreated = false;
    this.Xposition = this.initialPosition.x;
    this.Yposition = this.initialPosition.y;
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
  onUpload(e: File): void {
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    const render = new FileReader();
    render.onload = event => {
      const img = new Image();
      img.onload = () => {
        enum CanvasStructure {
          canvasWidth = canvas.width,
          canvasNaturalwidth = img.naturalWidth,
          canvasNaturalheight = img.naturalHeight,
          aspect = canvasNaturalwidth / canvasNaturalheight,
          totalHeight = canvasWidth / aspect
        }
        canvas.height = CanvasStructure.totalHeight;
        context.drawImage(
          img,
          0,
          0,
          CanvasStructure.canvasWidth,
          CanvasStructure.totalHeight
        );
      };
      // tslint:disable-next-line:no-string-literal
      img.src = (event.target as FileReader).result as string;
    };
    render.readAsDataURL(e[0]);
    this.loading = false;
  }
  createCircle(): void {
    this.count.push(1);
    this.Xposition = this.initialPosition.x;
    this.Yposition = this.initialPosition.y;
    this.isCircleCreated = true;
    this.msg.addMessageToNotification(
      'success',
      'Success',
      'Circle created Successfully'
    );
  }
  AddData(): void {
    const currentAxis = {
      xAxis: this.Xposition,
      yAxis: this.Yposition,
      Name: this.model.customerName,
      Location: this.model.customerLocation
    };
    this.circleJson.push(currentAxis);
    this.displayBasic = false;
    console.log('this.circleJson:', this.circleJson);
  }

  dragEnd(event: CdkDragEnd) {
    this.offset = { ...(event.source._dragRef as any)._passiveTransform };
    this.Xposition = this.initialPosition.x + this.offset.x;
    this.Yposition = this.initialPosition.y + this.offset.y;
  }
  ngOnDestroy() {
    this.destroyFileObj$.unsubscribe();
  }
}
