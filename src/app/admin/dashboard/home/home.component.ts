import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  //displayedColumns: string[] = ['title','ipUser','lastTime','maxTime','dischargeDate','dateExpiry','price','paymentMethod','actions'];
  displayedColumns1 = ['Titulo','IP usuario','Último tiempo de visualización','Tiempo máximo de visualización','Fecha de Alta','Fecha de Expiración','Precio','Medio de pago','Acciones'];
  ELEMENT_DATA1 = [
    {"Titulo":"","IP usuario":"","Último tiempo de visualización":"","Tiempo máximo de visualización":"","Fecha de Alta":"","Fecha de Expiración":"","Precio":"","Medio de pago":"","Acciones":""},
    //{title:"",ipUser:"",lastTime:"",maxTime:"",dischargeDate:"",dateExpiry:"",price:"",paymentMethod:"",actions:""}
  ];
  dataTableAux1;
  email:boolean = false;
  claroMovil:boolean = false;
  claroHogar:boolean = false;
  lookupValue: string;
  searchType = 0;
  myForm: FormGroup;

  displayedColumns2 = ['Titulo','Origen','IP usuario','Fecha de Alta','Fecha de Expiración','Precio','Medio de pago','Estado pago','Detalle abono','Detalle acción','Acciones'];
  ELEMENT_DATA2 = [
    {"Titulo":"Suscripción","Origen":"Paquete","IP usuario":"181.89.12.543","Fecha de Alta":"04/12/2021","Fecha de Expiración":"04/12/2022","Precio":"$ 0","Medio de pago":"Claro Móvil","Estado pago":"Promoción","Detalle abono":"Ver","Detalle acción":"","Acciones":"Cancelar"},
    {"Titulo":"Suscripción","Origen":"Paquete","IP usuario":"181.89.12.543","Fecha de Alta":"04/12/2021","Fecha de Expiración":"04/12/2022","Precio":"$ 0","Medio de pago":"Claro Móvil","Estado pago":"Promoción","Detalle abono":"Ver","Detalle acción":"","Acciones":"Cancelar"}    
  ];
  dataTableAux2;

  displayedColumns3 = ['Dispositivo','Nombre','Product ID / Serial','Fecha de activación'];
  ELEMENT_DATA3 = [
    {"Dispositivo":"web0s","Nombre":"Dispositivo 3","Product ID / Serial":"235b3d2b-b106-6bf5-a21b-dcacf3f57e43","Fecha de activación":"30/04/2020"},
    {"Dispositivo":"web0s","Nombre":"Dispositivo 3","Product ID / Serial":"235b3d2b-b106-6bf5-a21b-dcacf3f57e43","Fecha de activación":"30/04/2020"}
  ];
  dataTableAux3;

  constructor(public fb: FormBuilder) {
    this.myForm = this.fb.group({
      lookupValue: ['', [Validators.required]]
    });
  }
  ngOnInit() {
    this.dataTableAux1 = JSON.stringify({columns: this.displayedColumns1, elements: this.ELEMENT_DATA1});
    this.dataTableAux2 = JSON.stringify({columns: this.displayedColumns2, elements: this.ELEMENT_DATA2});
    this.dataTableAux3 = JSON.stringify({columns: this.displayedColumns3, elements: this.ELEMENT_DATA3});
  }

  onSearchUser(){
    let element = document.getElementById("panel");
    element.classList.remove('hide');
    element.classList.add('visible');
    
  }

  searchSelection(type){
    this.searchType = type;
    if(type == 1){
      this.email = true;
      this.claroHogar = this.claroMovil = false;
    }else if(type == 2){
      this.claroHogar = true;
      this.email = this.claroMovil = false;
    }else if(type == 3){
      this.claroMovil = true;
      this.email = this.claroHogar = false;
    }else{
      this.searchType = 0;
      this.email = this.claroHogar = this.claroMovil = false;
    }    
  }
}
