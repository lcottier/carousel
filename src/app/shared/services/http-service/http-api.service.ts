import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class HttpApiService {
    constructor(private http: HttpClient) {
    }

    get<T>(url: string, params: HttpParams = new HttpParams()): any {
        return this.http.get<T>(url, { params });
    }
}
