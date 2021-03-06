import { Component, ViewChild, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";

import { SortDescriptor, orderBy } from "@progress/kendo-data-query";

import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent
} from "@progress/kendo-angular-grid";

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { CategoriesService } from "./northwind.service";

@Component({
  providers: [CategoriesService],
  selector: "list-detail-view-app",
  templateUrl: "listDetailView.component.html"
})
export class ListDetailViewComponent implements OnInit {
  public sort: Array<SortDescriptor> = [];
  public pageSize = 10;
  public skip = 0;
  public view: GridDataResult;

  /**
     * The category for which details are displayed
     */
    @Input() public parent: any;

  // For Angular 8
  // @ViewChild(GridComponent, { static: true })
  // public grid: GridComponent;

  @ViewChild(GridComponent) grid: GridComponent;

  constructor(private service: CategoriesService,private formBuilder: FormBuilder) {}  

  public ngOnInit(): void {
    // Fetch the data with the initial state
    this.view = {data:this.parent.children, total:this.parent.children.length}
    console.log(this.parent);
  }

    public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadProducts();
  }

  private loadProducts(): void {
    console.log('load products with sort:'+this.sort);
    this.view = {
      data: orderBy(this.parent.children, this.sort),
      total: this.parent.children.length
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
