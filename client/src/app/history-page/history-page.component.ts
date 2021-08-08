import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialInstance, MaterialService} from "../shared/material.service";
import {OrdersService} from "../shared/services/orders.service";
import {Filter, Order} from "../shared/models";
import {Subscription} from "rxjs";

const STEP = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  ifFilterVisible: boolean = false;
  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: MaterialInstance;
  oSub: Subscription;
  orders: Order[] = [];
  filter: Filter = {};

  loading: boolean = false;
  reloading: boolean = false;

  offset = 0;
  limit = STEP;
  noMoreOrders: boolean = false;

  constructor(
    private ordersService: OrdersService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.fetch();
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }

  ngOnDestroy() {
    this.tooltip.destroy();
    this.oSub.unsubscribe();
  }

  private fetch() {
    const params = Object.assign({}, this.filter, {
        offset: this.offset,
        limit: this.limit
    });

    this.oSub = this.ordersService.fetch(params)
      .subscribe(
        (orders: Order[]) => {
          this.orders = this.orders.concat(orders);
          this.noMoreOrders = orders.length < STEP;
        },
        error => MaterialService.toast(error.error.message),
        () => {
          this.loading = false;
          this.reloading = false;
        }
      )
  }

  loadMore() {
    this.offset += STEP;
    this.loading = true;
    this.fetch();
  }

  applyFilter(filter: Filter) {
    this.orders = [];
    this.offset = 0;
    this.filter = filter;
    this.reloading = true;
    this.fetch();
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0;
  }
}
