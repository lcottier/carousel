import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import * as Flickity from 'flickity';
import { Subscription } from 'rxjs';
import { VisualisationApiService } from 'src/app/shared/services/api/visualisations-api/visualisations-api.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy, AfterViewInit {

  subscriptions = new Subscription();

  constructor(private visualisationApiService: VisualisationApiService) { }

  ngOnInit(): void {
    this.getFeed();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngAfterViewInit(): void {
    // tslint:disable-next-line: no-unused-expression
    var flkty = new Flickity('.main-carousel', {
      // options
      cellAlign: 'left',
      contain: true
    });
  }

  private getFeed(): void {
    this.subscriptions.add(this.visualisationApiService.getVideoFeed().subscribe((feedData) => {
      console.log(feedData);
    }));
  }
}
