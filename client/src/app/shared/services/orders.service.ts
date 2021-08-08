import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
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
}
