import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageImageService {
  private currentSubject$ = new BehaviorSubject(null);

  constructor() {}

  getfileObs(): Observable<any> {
    return this.currentSubject$.asObservable();
  }

  setileObs(profile) {
    this.currentSubject$.next(profile);
  }
}
