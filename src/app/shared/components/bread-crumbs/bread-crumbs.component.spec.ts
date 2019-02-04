import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterModule} from '@angular/router';

import {AppRoutingModule} from '../../../app-routing.module';
import {SharedModule} from '../../shared.module';
import {BreadCrumbsComponent} from './bread-crumbs.component';
import {HostBreadcrumbComponent} from './host-breadcrumb.component.spec';

describe('BreadCrumbsComponent', () => {
  let component: BreadCrumbsComponent;
  let fixture: ComponentFixture<BreadCrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule, AppRoutingModule, SharedModule],
      declarations: [HostBreadcrumbComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadCrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have <ol> list', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('ol')).toBeTruthy();
  });
});
