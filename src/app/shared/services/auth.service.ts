import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AESEncryptDecryptService } from './encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl: string;

  constructor(private http: HttpClient, 
    private aesencryptService: AESEncryptDecryptService) {
    this.baseUrl = environment.url_server;
  }

  loginUser(data:any): Observable<any> {
    const encryptedPassword = this.aesencryptService.encrypt(data.data.password);
    data.data.password = encryptedPassword;

    const encryptedString = this.aesencryptService.encrypt(JSON.stringify(data));
    const encryptedData = {"data": encryptedString }

    const url = this.baseUrl + "Landing/Asesores/Autentica/";
    return this.http.post<any>(url, encryptedData);
  }
}
