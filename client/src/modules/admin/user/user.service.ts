import { Injectable } from '@angular/core';
import { DataService } from 'core/services/data.service';
import { Observable, tap } from 'rxjs';

@Injectable()
export class UserService {
    private endpoint: string = 'http://127.0.0.1:5000/api/user/';
    constructor(private dataService: DataService) { }
    getAll(params?: any): Observable<any> {
      return this.dataService.get(this.endpoint, params).pipe<any[]>(tap((response: any) => {
        return response;
      }));
    }

    store(body): Observable<boolean> {
      return this.dataService.post(this.endpoint + 'add', body).pipe<boolean>(tap((response: any) => true));
    }

    edit(body): Observable<any> {
      return this.dataService.putWithId(this.endpoint + 'update/'+ body.user_id, body).pipe<any>(tap((response: any) => true));
    }

    delete(user_id: number) {
      return this.dataService.delete(this.endpoint + 'delete/' + user_id);
    }
    getRoleName(): Observable<any> {
      return this.dataService.get(this.endpoint + 'getRoleName').pipe<any[]>(tap((response: any) => {
        return response;
      }));
    }

    bulkDelete(ids: any) {
      return this.dataService.delete(this.endpoint + 'delete_multiple', {body: {ids}});
    }
}
