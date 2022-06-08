import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { AESEncryptDecryptService } from './encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class UserQueryService {
  public baseUrl: string;
  temp:any;

  constructor(private http: HttpClient,
    private aesencryptService: AESEncryptDecryptService) { 
    this.baseUrl = environment.url_server;
  }

  user_data_by_email(data:any): Observable<any> {
    const encryptedString = this.aesencryptService.encrypt(JSON.stringify(data));
    const encryptedData = {"data": encryptedString }
    this.temp = this.baseUrl + "Landing/Asesores/Correo/";
    return this.http.post<any>(this.temp, encryptedData);
  }

  user_data_by_mobile_line(data:any): Observable<any> {
    const encryptedString = this.aesencryptService.encrypt(JSON.stringify(data));
    const encryptedData = {"data": encryptedString }
    this.temp = this.baseUrl + "Landing/Asesores/LineaMovil/";
    return this.http.post<any>(this.temp, encryptedData); 
  }

  user_data_by_home_account(data:any): Observable<any> {
    const encryptedString = this.aesencryptService.encrypt(JSON.stringify(data));
    const encryptedData = {"data": encryptedString }
    this.temp = this.baseUrl + "Landing/Asesores/CuentaHogar/";
    return this.http.post<any>(this.temp, encryptedData); 
  }

  modify_user_mail(data:any): Observable<any> {
    const encryptedString = this.aesencryptService.encrypt(JSON.stringify(data));
    const encryptedData = {"data": encryptedString }
    this.temp = this.baseUrl + "Landing/Asesores/ModificarCorreo/";
    return this.http.post<any>(this.temp, encryptedData) 
  }

  find_devices_by_email(userdata:any): Observable<any> {
    const data = {
        "data": {
            "value": userdata.userdata.response.customerId,
        }
    };

    const encryptedString = this.aesencryptService.encrypt(JSON.stringify(data));
    const encryptedData = {"data": encryptedString }
    const url = this.baseUrl + "Landing/Asesores/ConsultarDispositivos/";
    
    return this.http.post<any>(url, encryptedData).pipe( 
      retry(1), 
      catchError(this.errorHandl),
      map( devices => ({
        ...userdata,
        devices : devices.error ? {} : devices
      }))
    ); 
  }

  find_subscription_by_email(userdata:any): Observable<any> {
    const url = this.baseUrl + "Landing/Asesores/ConsultarSuscripcionUsuario/";

    const { startDate, endDate } = userdata.userdata.response;
    const startD =  startDate ? startDate:  moment().subtract(4, 'M').format("YYYY-MM-DDT00:00:00[Z]");
    const endD = endDate ? endDate : moment().format("YYYY-MM-DDTHH:mm:ss[Z]");

    const data = {
      "data": {
          "value": userdata.userdata.response.customerId,
          "startDate": startD,
          "endDate": endD
      }
    };

    const encryptedString = this.aesencryptService.encrypt(JSON.stringify(data));
    const encryptedData = {"data": encryptedString }
    return this.http.post<any>(url, encryptedData).pipe( 
        retry(1), 
        catchError(this.errorHandl),
        map( subscriptions => ({
          ...userdata,
          subscriptions : subscriptions.error ? {} : subscriptions
        }))
      ); 
  }

  find_rent_data(userdata:any): Observable<any> {
    const url = this.baseUrl + "Landing/Asesores/ConsultarRentas/";

    const { startDate, endDate } = userdata.userdata.response;
    const startD =  startDate ? startDate:  moment().subtract(4, 'M').format("YYYY-MM-DDT00:00:00[Z]");
    const endD = endDate ? endDate : moment().format("YYYY-MM-DDTHH:mm:ss[Z]");

    const data = {
      "data": { 
          "startDate": startD,
          "endDate": endD,
          "value": userdata.userdata.response.customerId,
      }
    };
    const encryptedString = this.aesencryptService.encrypt(JSON.stringify(data));
    const encryptedData = {"data": encryptedString }
    return this.http.post<any>(url, encryptedData).pipe( 
        retry(1), 
        catchError(this.errorHandl),
        map( rent => ({
          ...userdata,
          rent : rent.error ? {} : rent
        }))
      ); 
  }

  change_client_names(data:any): Observable<any> {
    const encryptedString = this.aesencryptService.encrypt(JSON.stringify(data));
    const encryptedData = {"data": encryptedString }
    this.temp = this.baseUrl + "Landing/Asesores/ActualizarNombreApellido/";
    return this.http.post<any>(this.temp, encryptedData); 
  }

  
  change_client_password(data:any){
    const encryptedString = this.aesencryptService.encrypt(JSON.stringify(data));
    const encryptedData = {"data": encryptedString }
    this.temp = this.baseUrl + "Landing/Asesores/RecuperarContrasena/";
    return this.http.post<any>(this.temp, encryptedData); 
  }


  delete_user_account(data:any){
    const encryptedString = this.aesencryptService.encrypt(JSON.stringify(data));
    const encryptedData = {"data": encryptedString }
    this.temp = this.baseUrl + "Landing/Asesores/EliminarCuenta/";
    return this.http.post<any>(this.temp, encryptedData);
  }

  errorHandl(error:any) {
    return throwError(error);
  }
}
