import {TestBed, tick, fakeAsync} from '@angular/core/testing';
import {LoaderService} from './loader.service';

describe(`LoaderService`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService],
    });
  });

  it('should return initial state `show = false`', fakeAsync(() => {
    const service: LoaderService = TestBed.get(LoaderService);
    const callback: jasmine.Spy = jasmine.createSpy('returnLoaderState');

    service.loaderState.subscribe(callback);

    service.show();

    tick();

    expect(callback.calls.first().args[0].show).toBeFalsy();
  }));

  it('should toggle own state', fakeAsync(() => {
    const service: LoaderService = TestBed.get(LoaderService);
    const callback: jasmine.Spy = jasmine.createSpy('returnLoaderState');

    service.loaderState.subscribe(callback);

    service.show();

    tick();

    expect(callback.calls.mostRecent().args[0].show).toBeTruthy();
  }));
});