import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HostFooterComponent} from './host-footer.component.spec';
import {FooterComponent} from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  const findElem = (it: string) =>
    fixture.debugElement.nativeElement.querySelector(it);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent, HostFooterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render <footer> container', () => {
    expect(findElem('footer')).toBeTruthy();
  });

  it('should feel right as child', () => {
    const testFixture = TestBed.createComponent(HostFooterComponent);
    testFixture.detectChanges();

    const hostContainsFooter = !!testFixture.debugElement.nativeElement.querySelector(
      'footer',
    );

    expect(hostContainsFooter).toBeTruthy();
  });
});
