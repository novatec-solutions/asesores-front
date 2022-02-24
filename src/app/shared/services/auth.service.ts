import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl: string;

  constructor(private http: HttpClient) {}

  loginUser(data:any): Observable<any> {
    const url = "https://asesoresapp-back-miclaro-dev-novatec.104.209.147.150.nip.io/m3/Landing-Asesores/Login/";
    return this.http.post<any>(url, data);
  }
}
