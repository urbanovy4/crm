import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AnalyticsPage, OverviewPage} from "../models";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(
    private _http: HttpClient
  ) {
  }

  getOverview(): Observable<OverviewPage> {
    return this._http.get<OverviewPage>('api/analytics/overview');
  }

  getAnalytics(): Observable<AnalyticsPage> {
    return this._http.get<AnalyticsPage>('api/analytics/analytics');
  }
}
