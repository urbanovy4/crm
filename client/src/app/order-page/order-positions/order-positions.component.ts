import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PositionsService} from "../../shared/services/positions.service";
import {Observable} from "rxjs";
import {Position} from "../../shared/models";
import {map, switchMap} from "rxjs/operators";
import {OrderServiceUI} from "../order.service";
import {MaterialService} from "../../shared/material.service";

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {

  positions$: Observable<Position[]>;

  constructor(
    private route: ActivatedRoute,
    private positionsService: PositionsService,
    private orderService: OrderServiceUI
  ) { }

  ngOnInit(): void {
   this.positions$ = this.route.params
      .pipe(
        switchMap((params: Params) => this.positionsService.fetch(params['id'])),
        map(
          (positions: Position[]) => {
            return positions.map(position => {
              position.quantity = 1;
              return position;
            })
          }
        )
      );
  }

  addToOrder(position: Position) {
    MaterialService.toast(`Added x${position.quantity} ${position.name}.`)
    this.orderService.add(position);
  }
}
