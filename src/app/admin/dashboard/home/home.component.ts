import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { enums } from 'src/app/shared/enumText';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { UserQueryService } from '../../../shared/services/user-query.service';

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
  lookupValue: string;
  sType: string = '';
  dataTableAux1;
  dataTableAux2;
  dataTableAux3;
  loading: boolean = false;
  visible: boolean = false;
  userData: any;
  searchForm: FormGroup;
  userForm: FormGroup;

  displayedColumns1 = ['title','ipUser','lastTime','maxTime','highDate','dateExpiry','price','payMethod','actions'];
  ELEMENT_DATA1 = [{title:"",ipUser:"",lastTime:"",maxTime:"",highDate:"",dateExpiry:"",price:"",payMethod:"",actions:""}];

  displayedColumns2 = ['title','origin','ipUser','highDate','dateExpiry','price','payMethod','paidStatus','payDetail','actionDetail','actions'];
  ELEMENT_DATA2 = [
    {title:"Suscripción",origin:"Paquete",ipUser:"181.89.12.543",highDate:"04/12/2021",dateExpiry:"04/12/2022",price:"$ 0",payMethod:"Claro Móvil",paidStatus:"Promoción",payDetail:"Ver",actionDetail:"",actions:"Cancelar"},
    {title:"Suscripción",origin:"Paquete",ipUser:"181.89.12.543",highDate:"04/12/2021",dateExpiry:"04/12/2022",price:"$ 0",payMethod:"Claro Móvil",paidStatus:"Promoción",payDetail:"Ver",actionDetail:"",actions:"Cancelar"}];
  
  displayedColumns3 = ['device','name','serial','actDate'];
  ELEMENT_DATA3 = [{device:"web0s",name:"Dispositivo 3",serial:"235b3d2b-b106-6bf5-a21b-dcacf3f57e43",actDate:"30/04/2020"},
    {device:"web0s",name:"Dispositivo 3",serial:"235b3d2b-b106-6bf5-a21b-dcacf3f57e43",actDate:"30/04/2020"}];

  constructor(public fb: FormBuilder, 
              public dialog: MatDialog,
              private UserQueryService: UserQueryService,
              private renderer: Renderer2) {
    this.searchForm = this.fb.group({lookupValue: [{ value:'', disabled: true },Validators.required]});
    this.userForm = this.fb.group({ mail: '', firstName: '',lastName: '' });
  }

  ngOnInit() {
    this.dataTableAux1 = JSON.stringify({columns: this.displayedColumns1, elements: this.ELEMENT_DATA1});
    this.dataTableAux2 = JSON.stringify({columns: this.displayedColumns2, elements: this.ELEMENT_DATA2});
    this.dataTableAux3 = JSON.stringify({columns: this.displayedColumns3, elements: this.ELEMENT_DATA3});
  }

  onSearchUser(){
    this.loading = true;
    const valor = this.searchForm.value.lookupValue;
    if(this.email){
      const request = { "data":{ "emailAddress": valor, "state": "A" } };
      this.UserQueryService.user_data_by_email(request).subscribe( res => {  
        this.validateData(res);
      });
    }else if(this.hogar){
      const request = { "data": { "fixedAccount": valor, "state": "A" } };
      this.UserQueryService.user_data_by_home_account(request).subscribe( res => {  
        this.validateData(res);
      });
    }else if(this.movil){
      const request = { "data":{ "msisdn": '57'+valor, "state": "A" } };
      this.UserQueryService.user_data_by_mobile_line(request).subscribe( res => {  
        this.validateData(res);
      });
    }
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
        const msj = res.error>0 ? "Se ha producido un error" : "El correo ha sido cambiado con éxito";
        const dialogRef = this.dialog.open(DialogComponent, { 
          width: '250px',
          data: {text: msj},
        });
        dialogRef.afterClosed();
        this.activateBtn(this.btnMail);
      });
    }
  }

  modifyNames(data){
    if(this.userForm.controls.firstName.value !='' && this.userForm.controls.lastName.value !=''){
      this.disableBtn(this.btnNames);
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
    if(data?.error && data?.error > 0){
      const dialogRef = this.dialog.open(DialogComponent, { 
        width: '250px',
        data: {text: 'No hay resultados para los datos ingresados en la búsqueda.'},
      });
      dialogRef.afterClosed();
      this.loading = false;
    }else{
      this.userData = data.response;
      this.userForm.setValue({
        mail: this.userData.emailAddress,
        firstName: this.userData.firstName,
        lastName: this.userData.lastName
      });
      this.loading = false;
      this.visible = true;
    }
  }

  searchSelection(type){
    this.searchForm.controls.lookupValue.enable();
    this.visible = false;
    this.loading = false;
    this.sType = enums.account(type);
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
        this.searchForm = this.fb.group({lookupValue: ['',[Validators.required, Validators.pattern(/^3{1}\d{9}$/)]]});
        break; 
     } 
    }   
  }

  dateChange(type, date){}
}


