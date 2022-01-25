import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {MaterialInstance, MaterialService} from "../shared/material.service";
import {OrderServiceUI} from "./order.service";
import {Order, OrderPosition} from "../shared/models";
import {OrdersService} from "../shared/services/orders.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [OrderServiceUI]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  isRoot: boolean;
  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance;
  pending: boolean = false;
  oSub: Subscription;

  constructor(
    private router: Router,
    public orderServiceUI: OrderServiceUI,
    private ordersService: OrdersService
  ) {
  }

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });
  }

  ngOnDestroy() {
    this.modal.destroy();
    if (this.oSub) {
      this.oSub.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  openModal() {
    this.modal.open();
  }

  cancel() {
    this.modal.close()
  }

  removePosition(orderPosition: OrderPosition) {
    this.orderServiceUI.remove(orderPosition);
  }

  submit() {
    this.pending = true;
    this.modal.close();

    const order: Order = {
      list: this.orderServiceUI.list.map(item => {
        delete item._id;
        return item;
      })
    };

    this.oSub = this.ordersService.create(order)
      .subscribe(
        newOrder => {
          MaterialService.toast(`Order №${newOrder.order} was added.`);
          this.orderServiceUI.clear();
        },
        error => MaterialService.toast(error.error.message),
        () => {
          this.modal.close();
          this.pending = false;
        }
      );
  }
}
