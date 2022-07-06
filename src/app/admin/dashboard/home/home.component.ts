import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { enums } from 'src/app/shared/enumText';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { UserQueryService } from '../../../shared/services/user-query.service';
import { map, mergeMap, tap } from 'rxjs/operators';
import { mapDevices, mapSubscriptions, mapRent } from '../mappers/user-query.mapper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild("btnMail") btnMail: ElementRef;
  @ViewChild("btnNames") btnNames: ElementRef;
  email:boolean = false;
  movil:boolean = false;
  hogar:boolean = false;
  lookupValue = "";
  sType: string = '';
  dataTableSubscriptions;
  dataTableDevices;
  dataTableRent;
  loading: boolean = false;
  visible: boolean = false;
  userData: any;
  searchForm: FormGroup;
  userForm: FormGroup;
  dataRange: any;
  nMaxLenghtSearch: number = 50;

  displayedColumnsSubscriptions = ['descripcion','ipUsuario','fechaAlta','fechaExpiracion','precio','medioPago','estadoPago','payDetail','detalleAccion','actions'];
  ELEMENT_DATA_SUBSCRIPTIONS = [];
  
  displayedColumnsDevices = ['tipoDispositivo','nombreDispositivo','fechaActivacion'];
  ELEMENT_DATA_DEVICES = [];

  displayedColumnsRent = ['descripcion','ipUsuario','fechaAlta','fechaExpiracion','precio','medioPago','idRenta','idRefRenta','moneda','actions'];
  ELEMENT_DATA_RENT = [];
  
  constructor(public fb: FormBuilder, 
              public dialog: MatDialog,
              private UserQueryService: UserQueryService,
              private renderer: Renderer2) {
    this.searchForm = this.fb.group({lookupValue: [{ value:'', disabled: true },Validators.required]});
    this.userForm = this.fb.group({ mail: ['', [Validators.email, Validators.required]], 
                                  firstName: '',
                                  lastName: '' 
    });
    
  }

  ngOnInit() {
    this.setDevicesData([]);
    this.setSubscriptionsData([]);
    this.setRentData([]);
  }

  private setSubscriptionsData(subscriptions){
    this.ELEMENT_DATA_SUBSCRIPTIONS = subscriptions;
    this.dataTableSubscriptions = JSON.stringify({columns: this.displayedColumnsSubscriptions, elements: this.ELEMENT_DATA_SUBSCRIPTIONS});
  }

  private setDevicesData(devicesData){
    this.ELEMENT_DATA_DEVICES = devicesData;
    this.dataTableDevices = JSON.stringify({columns: this.displayedColumnsDevices, elements: this.ELEMENT_DATA_DEVICES});
  }

  private setRentData(rentData){
    this.ELEMENT_DATA_RENT = rentData;
    this.dataTableRent = JSON.stringify({columns: this.displayedColumnsRent, elements: this.ELEMENT_DATA_RENT});
  }

  private getSelectedData(valor){
    if(this.email){
      return {
        key: "emailAddress",
        value: valor,
        method: 'user_data_by_email'
      };
    }

    if(this.movil){
      return {
        key: "msisdn",
        value: `57${valor}`,
        method: 'user_data_by_mobile_line'
      }
    }
    
    if(this.hogar){
      return {
        key: "fixedAccount",
        value: valor,
        method: 'user_data_by_home_account'
      }
    }
  }

  onSearchUser(){
    this.userData = {};
    this.loading = true;
    const valor = this.searchForm.value.lookupValue;
    const { key, value, method } = this.getSelectedData(valor);

    const request = { 
        "data": { 
          [ key ]: value,
          "state": localStorage.getItem('userStatus') 
        }
     };

    this.UserQueryService[method](request).pipe(
      map( userdata => ({ userdata })),
      tap( data => { this.dataRange = data }),
      mergeMap( res => this.UserQueryService.find_subscription_by_email(res)),
      mergeMap( res => this.UserQueryService.find_devices_by_email(res)),
      mergeMap( res => this.UserQueryService.find_rent_data(res))
    )
    .subscribe( ({ userdata, subscriptions, devices, rent }) => {
      this.validateData(userdata);
      
      if(subscriptions.response){
        const subscriptionData = mapSubscriptions(subscriptions);
        this.setSubscriptionsData(subscriptionData);
      }else{
        this.setSubscriptionsData([]);
      }
      
      if(devices.response){
        const devicesData = mapDevices(devices);
        this.setDevicesData(devicesData);
      }else{
        this.setDevicesData([]);
      }

      if(rent.response){
        const rentData = mapRent(rent);
        this.setRentData(rentData);
      }else{
        this.setRentData([]);
      }
      
    });
  }

  modifyMail(data){
    if(this.userForm.controls.mail.value !=''){
      this.disableBtn(this.btnMail);
      const param = {data :{
        customerId: data.customerId,
        providerId: data.providerId,
        idNumber: data.idNumber,
        emailAddress: this.userForm.controls.mail.value
      }};
     
      this.UserQueryService.modify_user_mail(param).subscribe( res => {
        this.showMessage(res.response);
        this.activateBtn(this.btnMail);
      });
    }
  }

  modifyNames(data){
    if(this.userForm.controls.firstName.value !='' && this.userForm.controls.lastName.value !=''){
      this.disableBtn(this.btnNames);
      const param = {data :{
        customerId: data.customerId,
        providerId: data.providerId,
        idNumber: data.idNumber,
        firstName: this.userForm.controls.firstName.value,
        lastName: this.userForm.controls.lastName.value
      }};
      this.UserQueryService.change_client_names(param).subscribe( res => {
        const msj = res.error>0 ? "Se ha producido un error" : "El nombre y apellido se cambiaron con éxito";
        this.showMessage(msj);
        this.activateBtn(this.btnNames);
      });
    }
  }
  
  activateBtn(element){
    this.renderer.removeAttribute(element.nativeElement, "disabled");
    this.renderer.removeClass(element.nativeElement, "bg-light-grey");
    this.renderer.addClass(element.nativeElement, "bg-red");
  }

  
  disableBtn(element){
    this.renderer.setAttribute(element.nativeElement, "disabled", "true");
    this.renderer.removeClass(element.nativeElement, "bg-red");
    this.renderer.addClass(element.nativeElement, "bg-light-grey");
  }
  

  validateData(data){
    this.userData = {};
    if(data.error == 0){
      this.userData = data.response;
      this.userForm.setValue({
        mail: this.userData.emailAddress,
        firstName: this.userData.firstName,
        lastName: this.userData.lastName
      });
      this.loading = false;
      this.visible = true;
    }else{
      this.loading = false;
      this.visible = false;
      const msj = 'No hay resultados para los datos ingresados en la búsqueda.';
      this.showMessage(msj);
    }
  }

  searchSelection(type){
    this.searchForm.controls.lookupValue.enable();
    this.visible = false;
    this.loading = false;
    this.sType = enums.account(type);
    this.nMaxLenghtSearch=50;
    switch(enums.account(type)) { 
      case 'email': { 
        this.email = true;
        this.hogar = this.movil = false;
        this.searchForm = this.fb.group({
          lookupValue: ['', [ Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)  
          ]]
        });
        break; 
      } 
      case 'hogar': { 
        this.hogar = true;
        this.email = this.movil = false;
        this.searchForm = this.fb.group({lookupValue: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9]{6}$/)]]});
        break; 
      }
      case 'movil': { 
        this.movil = true;
        this.email = this.hogar = false;
        this.nMaxLenghtSearch=10;
        this.searchForm = this.fb.group({lookupValue: ['',[Validators.required, Validators.pattern(/^3{1}\d{9}$/)]]});
        break; 
     } 
    }   
  }

  dateChange(date:any){ 
    this.dataRange.userdata.response.startDate = date.start;
    this.dataRange.userdata.response.endDate = date.end;

    this.UserQueryService.find_subscription_by_email(this.dataRange).subscribe( res => {
      if(res.subscriptions.error == 0){
        const subscriptionData = mapSubscriptions(res.subscriptions);
        this.setSubscriptionsData(subscriptionData);
      }
    });    
  }

  dateChangeRent(date:any){
    this.dataRange.userdata.response.startDate = date.start;
    this.dataRange.userdata.response.endDate = date.end;

    this.UserQueryService.find_rent_data(this.dataRange).subscribe( res => {
      console.log(res)
      if(res.rent.error == 0){
        const rentData = mapSubscriptions(res.rent);
        this.setSubscriptionsData(rentData);
      }
    }); 
  }

  changePassword(){
    const msj = "Se enviara un mensaje de recuperación al correo electrónico registrado en la búsqueda.";
    this.showMessage(msj);

    const param = {data:{
      value: this.userData.customerId,
    }};
    
    this.UserQueryService.change_client_password(param).subscribe( res => {});
  }

  getPaymentType(type){
    return type == 2 ? 'Factura Claro Hogar' : type == 1 ? 'Factura Claro Movil' : '';
  }

  
  showMessage(msj){
    const dialogRef = this.dialog.open(DialogComponent, { 
      width: '250px',
      data: {text: msj},
    });
    dialogRef.afterClosed(); 
  }

  deleteAccount(){
    const param = {data :{
      customerId: this.userData.customerId,
      providerId: this.userData.providerId,
      transactionId: this.userData.operatorUserId
    }};

    this.UserQueryService.delete_user_account(param).subscribe( res => {
      this.showMessage(res.response);
    });
  }
}


