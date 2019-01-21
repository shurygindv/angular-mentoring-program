import * as R from 'ramda';
import {Output, Component, DebugElement} from '@angular/core';
import {TestBed, async, ComponentFixture} from '@angular/core/testing';

import {DateStatusDirective} from './date-status.directive';
import {By} from '@angular/platform-browser';

const TWENTY_DAYS = 1000 * 60 * 60 * 24 * 20;

@Component({
  selector: 'app-test-date-status-directive',
  template: `
    <div>
      <div id="active" [appDateStatus]="upToDate"></div>
      <div id="inactive" [appDateStatus]="oldDate"></div>
    </div>
  `,
})
class TestDateStatusDirectiveComponent {
  @Output() public upToDate: string = new Date().toString();
  @Output() public oldDate: string = new Date(
    Date.now() - TWENTY_DAYS,
  ).toString();
}

describe('[Directive] Testing: DateStatusDirective', () => {
  let fixture: ComponentFixture<TestDateStatusDirectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestDateStatusDirectiveComponent, DateStatusDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestDateStatusDirectiveComponent);
  }));

  it('should set active class when up-to-date', () => {
    const element: DebugElement = fixture.debugElement.query(By.css('#active'));

    fixture.detectChanges();

    const classes = [element.classes['box'], element.classes['box--green']];

    expect(classes.every(R.identity)).toBeTruthy();
  });

  it('should set inactive classes when next date', () => {
    const element: DebugElement = fixture.debugElement.query(
      By.css('#inactive'),
    );

    fixture.detectChanges();

    const classes = [element.classes['box'], element.classes['box--violet']];

    expect(classes.every(R.identity)).toBeTruthy();
  });
});
