import { Injectable } from '@angular/core';
import { DataService } from 'core/services/data.service';
import { Observable, tap } from 'rxjs';

@Injectable()
export class BridgeService {
    private repipeUrl: string = 'http://18.168.249.212/api/bridge/';
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
      return this.dataService.putWithId(this.repipeUrl + 'update/' + body.id, body).pipe<any>(tap((response: any) => true));
    }

    delete(item): Observable<any>  {
      return this.dataService.delete(this.repipeUrl + 'delete/' + item.recipe_id+ '/'+item.template_id);
    }
    getRecipe(): Observable<any> {
      return this.dataService.get(this.repipeUrl+'getRecipe').pipe<any[]>(tap((response: any) => {
        return response;
      }));
    }
    getTemplate(params?: any): Observable<any> {
      return this.dataService.get(this.repipeUrl+'getTemplate', params).pipe<any[]>(tap((response: any) => {
        return response;
      }));
    }

    bulkDelete(ids: any) {
      return this.dataService.delete(this.repipeUrl + 'delete_multiple', {body: {ids}});
    }
}
