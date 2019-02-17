import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

export interface LoaderState {
  show: boolean;
}

const show = () => ({show: true});
const hide = () => ({show: false});

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject: BehaviorSubject<LoaderState> = new BehaviorSubject(
    hide(),
  );

  public get loaderState(): Observable<LoaderState> {
    return this.loaderSubject.asObservable();
  }

  public show() {
    this.loaderSubject.next(show());
  }

  public hide() {
    this.loaderSubject.next(hide());
  }
}
