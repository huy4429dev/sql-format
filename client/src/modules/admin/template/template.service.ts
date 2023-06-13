import { Injectable } from '@angular/core';
import { DataService } from 'core/services/data.service';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TemplateService {
  private repipeUrl: string = 'http://127.0.0.1:5000/api/template/';
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
    return this.dataService.putWithId(this.repipeUrl + 'update/'+ body.template_id, body).pipe<any>(tap((response: any) => true));
  }

  delete(template_id: string) {
    return this.dataService.delete(this.repipeUrl + 'delete/' + template_id);
  }

  bulkDelete(ids: any) {
    return this.dataService.delete(this.repipeUrl + 'delete_multiple', {body: {ids}});
  }

  getHistory(template_id: string, params?: any): Observable<any> {
    return this.dataService.get(this.repipeUrl + 'history/' + template_id, params).pipe<any[]>(tap((response: any) => {
      return response;
    }));
  }
  getDataWarehouseType(): Observable<any> {
    return this.dataService.get(this.repipeUrl + 'warehousetype').pipe<any[]>(tap((response: any) => {
      return response;
    }));
  }
  getDataSourcePlatformType(): Observable<any> {
    return this.dataService.get(this.repipeUrl + 'sourceplatformtype').pipe<any[]>(tap((response: any) => {
      return response;
    }));
  }
    
  getConnector(): Observable<any> {
    return this.dataService.get(this.repipeUrl + 'connector').pipe<any[]>(tap((response: any) => {
      return response;
    }));
  }
}
