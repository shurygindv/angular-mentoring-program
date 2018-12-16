import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BreadCrumbsComponent} from './bread-crumbs.component';
import {HostBreadcrumbComponent} from './host-breadcrumb.component.spec';

describe('BreadCrumbsComponent', () => {
  let component: BreadCrumbsComponent;
  let fixture: ComponentFixture<BreadCrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BreadCrumbsComponent, HostBreadcrumbComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadCrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <ol> list', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('ol')).toBeTruthy();
  });

  it('should render breadcrumbs', () => {
    const compiled = fixture.debugElement.nativeElement;

    component.items = ['#one', '#two', 'wooah'];
    fixture.detectChanges();

    expect(compiled.querySelector('ol').children.length).toBe(3);
  });

  it('should work pretty as child through host', () => {
    const testFixture = TestBed.createComponent(HostBreadcrumbComponent);

    const testComponent = testFixture.componentInstance;
    const compiled = testFixture.debugElement.nativeElement;

    testComponent.underTestComponent.items = ['#first', '#two', 'wooah'];

    testFixture.detectChanges();

    expect(compiled.querySelector('ol').children.length).toBe(3);
    expect(compiled.querySelector('li').textContent.trim()).toEqual('#first');
  });
});
