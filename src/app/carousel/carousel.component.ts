import { Component, AfterViewInit } from '@angular/core';

declare var Flickity: any;
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    // tslint:disable-next-line: no-unused-expression
    var flkty = new Flickity('.main-carousel', {
      // options
      cellAlign: 'left',
      contain: true
    });
  }

}
