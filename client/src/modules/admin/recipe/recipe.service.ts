import { Injectable } from '@angular/core';
import { DataService } from 'core/services/data.service';
import { Observable, tap } from 'rxjs';

@Injectable()
export class RecipeService {

  private repipeUrl: string = 'http://127.0.0.1:5000/api/recipe/';
  constructor(private dataService: DataService) { }
  getAll(params?: any): Observable<any> {
    return this.dataService.get(this.repipeUrl, params).pipe<any[]>(tap((response: any) => {
      return response;
    }));
  }

  store(body): Observable<boolean> {
    return this.dataService.post(this.repipeUrl + 'add', body).pipe<boolean>(tap((response: any) => true));
  }

  edit(body): Observable<any> {
    return this.dataService.putWithId(this.repipeUrl + 'update/' + body.recipe_id, body).pipe<any>(tap((response: any) => true));
  }

  delete(recipe_id: number) {
    return this.dataService.delete(this.repipeUrl + 'delete/' + recipe_id);
  }

  bulkDelete(ids: any) {
    return this.dataService.delete(this.repipeUrl + 'delete_multiple', {body: {ids}});
  }

  getHistory(recipe_id: string, params?: any): Observable<any> {
    return this.dataService.get(this.repipeUrl + 'history/' + recipe_id, params).pipe<any[]>(tap((response: any) => {
      return response;
    }));
  }
}
