import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {
  LoaderService,
  LoaderState,
} from '../../../core/services/loader/loader.service';

@Component({
  selector: 'app-loader-overlay',
  templateUrl: './loader-overlay.component.html',
  styleUrls: ['./loader-overlay.component.scss'],
})
export class LoaderOverlayComponent implements OnInit, OnDestroy {
  private loaderService: LoaderService;
  private subscription: Subscription;

  // tslint:disable-next-line:no-inferrable-types
  public show: boolean = false;

  constructor(loaderService: LoaderService) {
    this.loaderService = loaderService;
  }

  public ngOnInit(): void {
    this.subscription = this.loaderService.loaderState.subscribe(
      (state: LoaderState) => {
        this.show = state.show;
      },
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
