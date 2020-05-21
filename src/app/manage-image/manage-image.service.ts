import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageImageService {
  private passDataFromTable$ = new BehaviorSubject(null);
  private preserveTabledata$ = new ReplaySubject(1);

  constructor() {}
  getAllfiles(): Observable<any> {
    return this.preserveTabledata$.asObservable();
  }
  setAllfiles(file) {
    this.preserveTabledata$.next(file);
  }

  getSelectedfile(): Observable<any> {
    return this.passDataFromTable$.asObservable();
  }
  setSelectedfile(file) {
    this.passDataFromTable$.next(file);
  }
}
