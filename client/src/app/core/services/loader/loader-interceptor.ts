import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap, debounceTime} from 'rxjs/operators';

import {LoaderService} from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptor implements HttpInterceptor {
  private loaderService: LoaderService;

  constructor(loaderService: LoaderService) {
    this.loaderService = loaderService;
  }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this.showLoader();

    return next.handle(req).pipe(
      debounceTime(1000), // simulate, response is fast too
      tap(this.handleSuccessResponse, this.handleErrorResponse),
    );
  }

  private handleSuccessResponse = (event: HttpEvent<any>) => {
    if (event instanceof HttpResponse) {
      this.hideLoader();
    }
  }

  private handleErrorResponse = (err: Error) => {
    this.hideLoader();
  }

  private showLoader(): void {
    this.loaderService.show();
  }
  private hideLoader(): void {
    this.loaderService.hide();
  }
}
