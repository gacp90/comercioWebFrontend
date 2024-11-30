import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { delay, map } from 'rxjs/operators';
import { Category } from '../models/category.model';

import { environment } from '../../environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(  private http: HttpClient) { }

  /** ================================================================
   *  LOAD CATEGORIES
  ==================================================================== */
  loadCategories(query: any){
    return this.http.post<{ok: boolean, categories: Category[], total: number}>( `${base_url}/category/query`, query );
  }
}
