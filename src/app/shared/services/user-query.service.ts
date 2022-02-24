import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserQueryService {
  public baseUrl: string;
  temp:any;

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.url_server;
  }

  user_data_by_email(data:any): Observable<any> {
    this.temp = this.baseUrl + "Landing-Asesores/Correo/";

    return this.http.post<any>(this.temp, data).pipe( 
      retry(1), 
      catchError(this.errorHandl)) 
  }

  user_data_by_mobile_line(data:any): Observable<any> {
    this.temp = this.baseUrl + "Landing-Asesores/LineaMovil/";

    return this.http.post<any>(this.temp, data).pipe( 
      retry(1), 
      catchError(this.errorHandl)) 
  }

  user_data_by_home_account(data:any): Observable<any> {
    this.temp = this.baseUrl + "Landing-Asesores/CuentaHogar/";

    return this.http.post<any>(this.temp, data).pipe( 
      retry(1), 
      catchError(this.errorHandl)) 
  }

  errorHandl(error:any) {
    return throwError(error);
  }
}
