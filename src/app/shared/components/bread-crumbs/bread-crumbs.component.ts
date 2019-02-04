import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

interface IBreadcrumb {
  name: string;
  url: string;
}

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadCrumbsComponent implements OnInit {
  private route: ActivatedRoute;

  public breadcrumbs: IBreadcrumb[];

  constructor(route: ActivatedRoute) {
    this.route = route;
  }

  public setItems(items: IBreadcrumb[]) {
    this.breadcrumbs = [...items];
  }

  private mapRouteUrl () {
    const course = {
      url: '/courses',
      name: 'Courses',
    };

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.setItems([
        course,
        {
          url: `/courses/${id}`,
          name: `Course with id ${id}`,
        },
      ]);
    }

    this.setItems([course]);
  }

  public ngOnInit() {
    this.mapRouteUrl();
  }
}
