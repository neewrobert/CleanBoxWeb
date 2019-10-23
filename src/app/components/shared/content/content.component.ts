import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit {
  public IsFluid: boolean = false;

  constructor() {
    this.onResize();
  }

  ngOnInit() { }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.IsFluid = (window.innerWidth <= 991);
  }
}
