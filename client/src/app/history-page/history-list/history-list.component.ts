import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {Order} from "../../shared/models";
import {MaterialInstance, MaterialService} from "../../shared/material.service";

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements AfterViewInit, OnDestroy {

  @Input('orders') orders: Order[];
  @ViewChild('modal') modalRef: ElementRef

  selectedOrder: Order;
  modal: MaterialInstance;

  constructor() {
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  computePrice(order: Order): number {
    return order.list.reduce((total, item) => {
      total += item.quantity * item.cost;
      return total;
    }, 0);
  }

  selectOrder(order: Order) {
    this.selectedOrder = order;
    this.modal.open();
  }

  closeModal() {
    this.modal.close();
  }

}
