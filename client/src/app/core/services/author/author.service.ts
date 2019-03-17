import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Author} from './../../models/author.interface';
import {ApiService} from '../api.service';
import {Response} from '../../types';

@Injectable()
export class AuthorService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  public fetchAuthorById(id: string): Observable<Author> {
    return this.apiService
      .get(`/authors/${id}`)
      .pipe(map((res: Response<Author>) => res.Data));
  }

  public fetchAuthors(): Observable<Author[]> {
    return this.apiService
      .get('/authors')
      .pipe(map((res: Response<Author[]>) => res.Data));
  }
}
