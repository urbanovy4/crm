import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category, Message} from "../models";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(
    private _http: HttpClient
  ) {
  }

  fetch(): Observable<Category[]> {
    return this._http.get<Category[]>('/api/category');
  }

  getById(id: string): Observable<Category> {
    return this._http.get<Category>(`/api/category/${id}`);
  }

  createCategory(name: string, image?: File): Observable<Category> {
    const formData = new FormData();

    if (image) {
      formData.append('image', image, image.name);
    }
    formData.append('name', name);

    return this._http.post<Category>('api/category', formData);
  }

  updateCategory(id: string, name: string, image?: File): Observable<Category> {
    const formData = new FormData();

    if (image) {
      formData.append('image', image, image.name);
    }
    formData.append('name', name);

    return this._http.patch<Category>(`api/category/${id}`, formData);
  }

  deleteCategory(id: string): Observable<Message> {
    return this._http.delete<Message>(`api/category/${id}`);
  }

}
