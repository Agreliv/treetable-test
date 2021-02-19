import { Component, ViewChild, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent
} from "@progress/kendo-angular-grid";

import { SortDescriptor } from "@progress/kendo-data-query";

import { CategoriesService } from "./northwind.service";

@Component({
  providers: [CategoriesService],
  selector: "my-app",
  template: `
    <kendo-grid
      [data]="view | async"
      [loading]="view.loading"
      [skip]="skip"
      [sortable]="true"
      [sort]="sort"
      [pageable]="false"
      [height]="550"
      [navigable]="true"
      (dataStateChange)="dataStateChange($event)"
    >
      <kendo-grid-column field="CategoryID" width="100"></kendo-grid-column>
      <kendo-grid-column
        field="CategoryName"
        width="200"
        title="Category Name"
      ></kendo-grid-column>
      <kendo-grid-column field="Description" [sortable]="false">
      </kendo-grid-column>
      <div *kendoGridDetailTemplate="let dataItem">
        <category-details [category]="dataItem"></category-details>
      </div>
    </kendo-grid>
  `
})
export class AppComponent implements OnInit {
  public view: Observable<GridDataResult>;
  public sort: Array<SortDescriptor> = [];
  public pageSize = 10;
  public skip = 0;

  // For Angular 8
  // @ViewChild(GridComponent, { static: true })
  // public grid: GridComponent;

  @ViewChild(GridComponent) grid: GridComponent;

  constructor(private service: CategoriesService) {}

  public ngOnInit(): void {
    // Bind directly to the service as it is a Subject
    this.view = this.service;

    // Fetch the data with the initial state
    this.loadData();
  }

  public dataStateChange({ skip, take, sort }: DataStateChangeEvent): void {
    // Save the current state of the Grid component
    this.skip = skip;
    this.pageSize = take;
    this.sort = sort;

    // Reload the data with the new state
    this.loadData();

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
}
