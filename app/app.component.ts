import { Component, ViewChild, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent
} from "@progress/kendo-angular-grid";

import { SortDescriptor, orderBy } from "@progress/kendo-data-query";

import { CategoriesService } from "./northwind.service";
import Data from "./data.json";

@Component({
  providers: [CategoriesService],
  selector: "my-app",
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
  public view: GridDataResult;
  public sort: Array<SortDescriptor> = [];
  public pageSize = 10;
  public skip = 0;

  // For Angular 8
  // @ViewChild(GridComponent, { static: true })
  // public grid: GridComponent;

  @ViewChild(GridComponent) grid: GridComponent;

  constructor(private service: CategoriesService) { }

  public ngOnInit(): void {
    // Bind directly to the service as it is a Subject
    this.loadProducts();

    // Fetch the data with the initial state
    this.loadData();
  }

  public dataStateChange({ skip, take, sort }: DataStateChangeEvent): void {
    // Save the current state of the Grid component
    this.skip = skip;
    this.pageSize = take;
    this.sort = sort;

    // Reload the data with the new state
    //this.loadData();
    this.sortChange(sort);

    // Expand the first row initially
    this.grid.expandRow(0);
  }

  private loadData(): void {
    this.service.query({
      skip: this.skip,
      take: this.pageSize,
      sort: this.sort
    });
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadProducts();
  }

  private loadProducts(): void {
    console.log('load products with sort:'+this.sort);
    this.view = {
      data: orderBy(Data, this.sort),
      total: 682
    };
  }

  public getEyeColor(data): string {
    let result = "#eee";
    if (data.last_protocol?.result != undefined) {
      if (data.last_protocol.result == 0) {
        result = '#28a745';
      }
      if (data.last_protocol.result == 1) {
        result = '#f1c40f';
      }
      if (data.last_protocol.result == 3) {
        result = '#e74c3c';
      }
      if (data.last_protocol.result == 2 || data.last_protocol.result == 4) {
        result = '#C558D3';
      }
      if (data.last_protocol.result == 5) {
        result = '#036FFC';
      }
      const currentDate = new Date();
      const nextDate = new Date(data.last_protocol?.protocol_date_next);
      if (nextDate.getTime() != NaN && currentDate > nextDate) {
        result = '#e74c3c';
      }
    } else {
      result = '#000';
    }
    return result;
  }

  public getNextText(data): string {
    let result = "#eee";
    if (data.last_protocol?.result != undefined) {
      if (data.last_protocol.result == 0) {
        let tempDate = new Date(data.last_protocol?.protocol_date_next);
        result = this.generateTimestamp(tempDate);
      }
      if (data.last_protocol.result == 1) {
        let tempDate = new Date(data.last_protocol?.protocol_date_next);
        result = this.generateTimestamp(tempDate);
      }
      if (data.last_protocol.result == 3) {
        result = 'unauffindbar';
      }
      if (data.last_protocol.result == 2 || data.last_protocol.result == 4) {
        result = 'ausmustern';
      }
      if (data.last_protocol.result == 5) {
        let tempDate = new Date(data.last_protocol?.protocol_date_next);
        result = this.generateTimestamp(tempDate);
      }
      const currentDate = new Date();
      const nextDate = new Date(data.last_protocol?.protocol_date_next);
      if (nextDate.getTime() != NaN && currentDate > nextDate) {

        let tempDate = new Date(data.last_protocol?.protocol_date_next);
        result = this.generateTimestamp(tempDate);
      }
    } else {
      let tempDate = new Date(data.last_protocol?.protocol_date_next);
      result = this.generateTimestamp(tempDate);
    }
    return result;
  }

  private generateTimestamp(date: Date): string {
    let result =
      String(date.getDate()).padStart(2, '0') +
      '.' +
      String(date.getMonth() + 1).padStart(2, '0') +
      '.' +
      date.getFullYear();
    return result;
  }

  public showOnlyBeveragesDetails(dataItem: any, index: number): boolean {
    return dataItem?.children && dataItem?.children.length > 0;
  }
}
