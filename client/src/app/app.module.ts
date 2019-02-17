import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {AuthInterceptor} from './shared/auth-interceptor';
import {LoaderInterceptor} from './core/services/loader/loader-interceptor';
import {HTTP_INTERCEPTORS, HttpInterceptor} from '@angular/common/http';

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
  ],
  providers: [interceptor(AuthInterceptor), interceptor(LoaderInterceptor)],
  bootstrap: [AppComponent],
})
export class AppModule {}
