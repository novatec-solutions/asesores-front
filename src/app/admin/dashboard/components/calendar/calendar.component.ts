import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Output() selectedDate=new EventEmitter<string>();
  dateIni;
  currentDate = new Date();

  constructor(private dateAdapter: DateAdapter<any>) { }

  ngOnInit(): void {
    this.dateAdapter.setLocale('es');
    this.dateIni = new FormControl(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate()));
  }

  addEvent(event: MatDatepickerInputEvent<Date>){
    this.selectedDate.emit(JSON.stringify(`${event.value.getDate()}/${event.value.getMonth()+1}/${event.value.getFullYear()}`));
  }

}
