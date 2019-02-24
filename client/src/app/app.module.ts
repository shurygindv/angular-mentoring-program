import {NgModule} from '@angular/core';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {HTTP_INTERCEPTORS, HttpInterceptor} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {RootStoreModule} from './root-store/root-store.module';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';

import {AppComponent} from './app.component';
import {AuthInterceptor} from './shared/auth-interceptor';
import {LoaderInterceptor} from './core/services/loader/loader-interceptor';

const interceptor = (implementation: {new (): HttpInterceptor} | any) => ({
  provide: HTTP_INTERCEPTORS,
  useClass: implementation,
  multi: true,
});

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,

    // dev
    RootStoreModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
    }),
    ,
  ],
  providers: [interceptor(AuthInterceptor), interceptor(LoaderInterceptor)],
  bootstrap: [AppComponent],
})
export class AppModule {}
