import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICategoriasResponse, IColecoesResponse } from './models';

const USER_KEY = '6fa0c9a23dd6c63275f7b46a90cb5f1d';
const BASE_URL = 'https://developers.zomato.com/api/v2.1';

@Injectable({
  providedIn: 'root',
})
export class ZomatoService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      Accept: 'application/json',
      'user-key': USER_KEY,
    });
  }

  getCategories() {
    const url = `${BASE_URL}/categories`;
    return this.http.get<ICategoriasResponse>(url, { headers: this.headers });
  }
  getCollections(latitude: number, longitude: number) {
    const url = `${BASE_URL}/collections?lat=${latitude}&lon=${longitude}`;
    return this.http.get<IColecoesResponse>(url, { headers: this.headers });
  }
  getRestaurantList(cityId: number, categoria: number, colecao: number) {
    const query = `category=${categoria}&collection_id=${colecao}&entity_id=${cityId}&entity_type=city`;
    const url = `${BASE_URL}/search?${query}`;
    return this.http.get<any>(url, { headers: this.headers });
  }
}
