import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Order} from "../models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(
    private _http: HttpClient
  ) {
  }

  create(order: Order): Observable<Order> {
    return this._http.post<Order>('/api/order', order);
  }

  fetch(params: any = {}): Observable<Order[]> {
    return this._http.get<Order[]>('/api/order', {
      params: new HttpParams({
        fromObject: params
      })
    });
  }
}
