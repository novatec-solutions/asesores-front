import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AESEncryptDecryptService {

  secretKey = "0123456789abcdef0123456789abcdef";
  constructor() { }

  encrypt(value : string) : string {
    var key = CryptoJS.enc.Hex.parse(this.secretKey);
    var iv  = CryptoJS.enc.Hex.parse('abcdef9876543210abcdef9876543210')
    return CryptoJS.AES.encrypt(value, key, {
        iv:iv, 
        padding: CryptoJS.pad.ZeroPadding
    }).toString();
  }
}