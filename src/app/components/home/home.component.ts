import { Component, OnInit, HostListener } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public IsFluid: boolean = false;
  showNavigationArrows = true;
  showNavigationIndicators = false;
  
  constructor(config: NgbCarouselConfig) { 
    config.showNavigationArrows = true;
    config.showNavigationIndicators = false;
  }

  ngOnInit() {
    
  }

  @HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.IsFluid = (window.innerWidth <= 991);
	}

}
