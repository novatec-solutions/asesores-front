import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Output() selectedDate=new EventEmitter<any>();
  dateStart;
  dateEnd;

  constructor(private dateAdapter: DateAdapter<any>) { 
    this.dateStart = new FormControl(moment().subtract(4, 'M').toDate());
    this.dateEnd = new FormControl(moment().toDate());
    this.sendDate();
  }

  ngOnInit(): void {
    this.dateAdapter.setLocale('es');
  }

  sendDate(){
    this.selectedDate.emit({
      start: moment(this.dateStart.value).format("YYYY-MM-DDTHH:mm:ss[Z]"), 
      end: moment(this.dateEnd.value).format("YYYY-MM-DDT24:59:59[Z]")});
  }

}
