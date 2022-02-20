import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  dateStart;
  dateStartMin;
  dateStartMax;
  currentDate = new Date();

  constructor() { }

  ngOnInit(): void {
    this.dateStart = new FormControl(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate()));
  }

  addEvent(type, event: MatDatepickerInputEvent<Date>){
    console.log(type)
  }

}
