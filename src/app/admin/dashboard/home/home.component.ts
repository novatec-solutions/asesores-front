import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatAccordion} from '@angular/material/expansion';
import { enums } from 'src/app/shared/enumText';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  email:boolean = false;
  movil:boolean = false;
  hogar:boolean = false;
  lookupValue: string;
  sType: string = '';
  myForm: FormGroup;
  dataTableAux1;
  dataTableAux2;
  dataTableAux3;
  loading: boolean = false;
  visible: boolean = false;

  displayedColumns1 = ['title','ipUser','lastTime','maxTime','highDate','dateExpiry','price','payMethod','actions'];
  ELEMENT_DATA1 = [{title:"",ipUser:"",lastTime:"",maxTime:"",highDate:"",dateExpiry:"",price:"",payMethod:"",actions:""}];

  displayedColumns2 = ['title','origin','ipUser','highDate','dateExpiry','price','payMethod','paidStatus','payDetail','actionDetail','actions'];
  ELEMENT_DATA2 = [
    {title:"Suscripción",origin:"Paquete",ipUser:"181.89.12.543",highDate:"04/12/2021",dateExpiry:"04/12/2022",price:"$ 0",payMethod:"Claro Móvil",paidStatus:"Promoción",payDetail:"Ver",actionDetail:"",actions:"Cancelar"},
    {title:"Suscripción",origin:"Paquete",ipUser:"181.89.12.543",highDate:"04/12/2021",dateExpiry:"04/12/2022",price:"$ 0",payMethod:"Claro Móvil",paidStatus:"Promoción",payDetail:"Ver",actionDetail:"",actions:"Cancelar"}];
  
  displayedColumns3 = ['device','name','serial','actDate'];
  ELEMENT_DATA3 = [{device:"web0s",name:"Dispositivo 3",serial:"235b3d2b-b106-6bf5-a21b-dcacf3f57e43",actDate:"30/04/2020"},
    {device:"web0s",name:"Dispositivo 3",serial:"235b3d2b-b106-6bf5-a21b-dcacf3f57e43",actDate:"30/04/2020"}];

  constructor(public fb: FormBuilder) {
    this.myForm = this.fb.group({lookupValue: [{ value:'', disabled: true },Validators.required]});
  }
  ngOnInit() {
    this.dataTableAux1 = JSON.stringify({columns: this.displayedColumns1, elements: this.ELEMENT_DATA1});
    this.dataTableAux2 = JSON.stringify({columns: this.displayedColumns2, elements: this.ELEMENT_DATA2});
    this.dataTableAux3 = JSON.stringify({columns: this.displayedColumns3, elements: this.ELEMENT_DATA3});
  }

  onSearchUser(){
    this.loading = true;
    setTimeout(()=>{
      this.loading = false;
      this.visible = true;
    }, 2000);
  }

  searchSelection(type){
    this.myForm.controls.lookupValue.enable();
    this.visible = false;
    switch(enums.account(type)) { 
      case 'email': { 
        this.email = true;
        this.hogar = this.movil = false;
        this.sType = 'email';
        this.myForm = this.fb.group({
          lookupValue: ['', [ Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)  
          ]]
        });
        break; 
      } 
      case 'hogar': { 
        this.hogar = true;
        this.email = this.movil = false;
        this.sType = 'text';
        this.myForm = this.fb.group({lookupValue: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9]{6}$/)]]});
        break; 
      }
      case 'movil': { 
        this.movil = true;
        this.email = this.hogar = false;
        this.sType = 'number';
        this.myForm = this.fb.group({lookupValue: ['',[Validators.required, Validators.pattern(/^3{1}\d{9}$/)]]});
        break; 
     } 
    }   
  }

  dateChange(type, date){}
}


