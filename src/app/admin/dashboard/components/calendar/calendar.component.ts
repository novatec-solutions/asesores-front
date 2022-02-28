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
  dateStart;
  dateEnd;
  currentDate = new Date();

  constructor(private dateAdapter: DateAdapter<any>) { 
    this.dateStart = new FormControl(new Date(this.currentDate.getFullYear(), (this.currentDate.getMonth()-4), 1));
    this.dateEnd = new FormControl(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate()));
    this.sendDate();
  }

  ngOnInit(): void {
    this.dateAdapter.setLocale('es');
  }

  sendDate(){
    this.selectedDate.emit(JSON.stringify({"start": this.dateStart.value.toISOString(), "end": this.dateEnd.value.toISOString()}));
  }

}
