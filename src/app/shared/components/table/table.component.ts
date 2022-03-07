import { Component, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { enums } from 'src/app/shared/enumText';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() dataForTable;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource;
  ELEMENT_DATA = [];
  displayedColumns = [];

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(changes:SimpleChange){
    if(this.dataForTable){
      let data = JSON.parse(this.dataForTable)
      this.displayedColumns = data.columns;
      this.ELEMENT_DATA = data.elements

      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    }
  }

  getHeaderTitle(id){ return enums.table(id); }
}
