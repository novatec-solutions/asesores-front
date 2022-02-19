import { Component, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() dataForTable;
  @ViewChild(MatPaginator) paginator: MatPaginator;
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

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

}
