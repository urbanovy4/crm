import {Injectable} from "@angular/core";
import {User} from "../models";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = null;

  constructor(
    private readonly _http: HttpClient
  ) {
  }

  registration(user: User): Observable<User> {
    return this._http.post<User>('/api/auth/register', user)
  }

  public login(user: User): Observable<{token: string}> {
    return this._http.post<{token: string}>('/api/auth/login', user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token);
            this.setToken(token);
          }
        )
      );
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }
}
