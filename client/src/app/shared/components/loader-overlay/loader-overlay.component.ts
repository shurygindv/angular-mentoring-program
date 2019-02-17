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

  public show = false;

  constructor(loaderService: LoaderService) {
    this.loaderService = loaderService;
  }

  public ngOnInit() {
    this.subscription = this.loaderService.loaderState.subscribe(
      (state: LoaderState) => {
        this.show = state.show;
      },
    );
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
