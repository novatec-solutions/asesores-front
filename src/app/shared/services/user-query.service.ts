import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
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

  modify_user_mail(data:any): Observable<any> {
    this.temp = this.baseUrl + "Landing-Asesores/ModificarCorreo/";

    return this.http.post<any>(this.temp, data).pipe( 
      retry(1), 
      catchError(this.errorHandl)) 
  }

  find_devices_by_email(userdata:any): Observable<any> {
    const data = {
        "data": {
            "Username": "PA00003102",
            "Password": "aMc0Co3!",
            "invokeMethod": "consultardispositivoscliente",
            "correlatorId": "00000232550e8400e29b41d4a716446655440799",
            "countryId": "CO",
            "employeeId": "9984",
            "origin": "MI_CLARO",
            "serviceName": "consultardispositivoscliente",
            "providerId": "PA00002812",
            "iccidManager": "AMCOCO",
            "key": "CUSTOMERID",
            "value": "6666869"
        }
    };
    const url = this.baseUrl + "Landing-Asesores/ConsultarDispositivos/";

    return this.http.post<any>(url, data).pipe( 
      retry(1), 
      catchError(this.errorHandl),
      map( devices => ({
        ...userdata,
        devices
      }))
    ); 
  }

  find_subscription_by_email(userdata:any): Observable<any> {
    const data = {
        "data": {
            "Username": "PA00003102",
            "Password": "aMc0Co3!",
            "invokeMethod": "consultardatoscliente",
            "correlatorId": "00000232550e8400e29b41d4a716446655449899",
            "countryId": "CO",
            "employeeId": "567shsgww3",
            "origin": "MI_CLARO",
            "serviceName": "consultardatoscliente",
            "providerId": "PA00002812",
            "iccidManager": "AMCOCO",
            "key": "CUSTOMERID",
            "value": "6666869"
        }
    };
    const url = this.baseUrl + "Landing-Asesores/ConsultarSuscripcionUsuario/";
    
    return this.http.post<any>(url, data).pipe( 
        retry(1), 
        catchError(this.errorHandl),
        map( subscriptions => ({
          ...userdata,
          subscriptions
        }))
      ); 
  }

  errorHandl(error:any) {
    return throwError(error);
  }
}