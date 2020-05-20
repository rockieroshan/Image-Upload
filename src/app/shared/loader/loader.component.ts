import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass']
})
export class LoaderComponent implements OnInit {
  constructor() {}
  @Input() loading: boolean;
  @Input() parentComponent: any;
  ngOnInit() {}
}
