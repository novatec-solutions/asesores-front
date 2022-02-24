import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.url_server;
  }

  loginUser(data:any): Observable<any> {
    const url = this.baseUrl + "Landing-Asesores/Login/";
    return this.http.post<any>(url, data);
  }
}
