import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message, Position} from "../models";

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  constructor(
    private _http: HttpClient
  ) {
  }

  fetch(categoryId: string): Observable<Position[]> {
    return this._http.get<Position[]>(`/api/position/${categoryId}`);
  }

  create(position: Position): Observable<Position> {
    return this._http.post<Position>('/api/position', position)
  }

  update(position: Position): Observable<Position> {
    return this._http.patch<Position>(`/api/position/${position._id}`, position)
  }

  delete(position: Position): Observable<Message> {
    return this._http.delete<Message>(`/api/position/${position._id}`);
  }
}
