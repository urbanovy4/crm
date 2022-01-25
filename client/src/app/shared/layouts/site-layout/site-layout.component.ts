import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Link} from "../../models";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MaterialService} from "../../material.service";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements AfterViewInit {

  @ViewChild('floating') floatingRef: ElementRef;

  links: Link[] = [
    {url: '/overview', name: 'Review'},
    {url: '/analytics', name: 'Analytics'},
    {url: '/history', name: 'History'},
    {url: '/order', name: 'Add order'},
    {url: '/categories', name: 'Assortment'},
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngAfterViewInit() {
    MaterialService.initializeFloatingButton(this.floatingRef);
  }

  logout(event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
