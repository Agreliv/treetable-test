import { Component, ViewChild, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";

import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent
} from "@progress/kendo-angular-grid";

import { SortDescriptor } from "@progress/kendo-data-query";

import { CategoriesService } from "./../northwind.service";

@Component({
  providers: [CategoriesService],
  selector: "list-detail-view-app",
  templateUrl: "listDetailView.Component.html"
})
export class ListDetailViewComponent implements OnInit {
  public sort: Array<SortDescriptor> = [];
  public pageSize = 10;
  public skip = 0;

  /**
     * The category for which details are displayed
     */
    @Input() public view: any;

  // For Angular 8
  // @ViewChild(GridComponent, { static: true })
  // public grid: GridComponent;

  @ViewChild(GridComponent) grid: GridComponent;

  constructor(private service: CategoriesService) {}

  public ngOnInit(): void {
    // Fetch the data with the initial state
    console.log(this.view);
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
        result =this.generateTimestamp(tempDate);
      }
      if (data.last_protocol.result == 1) {
        let tempDate = new Date(data.last_protocol?.protocol_date_next);
        result =this.generateTimestamp(tempDate);
      }
      if (data.last_protocol.result == 3) {
        result = 'unauffindbar';
      }
      if (data.last_protocol.result == 2 || data.last_protocol.result == 4) {
        result = 'ausmustern';
      }
      if (data.last_protocol.result == 5) {
        let tempDate = new Date(data.last_protocol?.protocol_date_next);
        result =this.generateTimestamp(tempDate);
      }
      const currentDate = new Date();
      const nextDate = new Date(data.last_protocol?.protocol_date_next);
      if (nextDate.getTime() != NaN && currentDate > nextDate) {
        
        let tempDate = new Date(data.last_protocol?.protocol_date_next);
        result =this.generateTimestamp(tempDate);
      }
    } else {      
        let tempDate = new Date(data.last_protocol?.protocol_date_next);
        result =this.generateTimestamp(tempDate);
    }
    return result;
  }

  private generateTimestamp(date:Date):string{
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
