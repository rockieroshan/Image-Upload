import { FileModel } from './../../model/file-model';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ManageImageService } from '../manage-image.service';
import { Router } from '@angular/router';

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
      .getfileObs()
      .pipe(takeUntil(this.destroyFileObj$))
      .subscribe(file => (this.selectedfileobj = file));

    fromEvent(this.canvas.nativeElement, 'mousemove')
      .pipe(takeUntil(this.destroyMouseEvent$))
      .subscribe((evt: MouseEvent) => {
        this.Xoffset = evt.offsetX;
        this.Yoffset = evt.offsetY;
      });
    if (!this.selectedfileobj) {
      this.router.navigate(['/image/add']);
    } else {
      this.onUpload(this.selectedfileobj);
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
        const w = canvas.width;
        const nw = img.naturalWidth;
        const nh = img.naturalHeight;
        const aspect = nw / nh;
        const h = w / aspect;
        canvas.height = h;
        context.drawImage(img, 0, 0, w, h);
      };
      // tslint:disable-next-line:no-string-literal
      img.src = (event.target as FileReader).result as string;
    };
    render.readAsDataURL(e[0]);
  }
  createCircle(): void {
    this.count.push(1);
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  AddData() {
    const currentAxis = {
      xAxis: this.Xoffset,
      yAxis: this.Yoffset,
      Name: this.model.customerName,
      Location: this.model.customerLocation
    };
    this.circleJson.push(currentAxis);
    this.displayBasic = false;
  }
  ngOnDestroy() {
    this.destroyMouseEvent$.unsubscribe();
    this.destroyFileObj$.unsubscribe();
  }
}
