import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

export interface LoaderState {
  show: boolean;
}

const show = (): LoaderState => ({show: true});
const hide = (): LoaderState => ({show: false});

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

  public show(): void {
    this.loaderSubject.next(show());
  }

  public hide(): void {
    this.loaderSubject.next(hide());
  }
}
