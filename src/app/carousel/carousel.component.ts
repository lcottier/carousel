import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import * as Flickity from 'flickity';
import { Subscription } from 'rxjs';
import { VisualisationApiService } from 'src/app/shared/services/api/visualisations-api/visualisations-api.service';
import { VideoFeedItem, VideoFeedData } from '../shared/models/video-feed-data.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy, AfterViewInit {

  subscriptions = new Subscription();
  carouselItems: Array<VideoFeedItem>;
  flkty: Flickity;

  constructor(private visualisationApiService: VisualisationApiService) { }

  ngOnInit(): void {
    this.getFeed();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngAfterViewInit(): void {
    // tslint:disable-next-line: no-unused-expression
    this.flkty = new Flickity('.main-carousel', {
      // options
      cellAlign: 'left',
      contain: true
    });
  }

  private getFeed(): void {
    this.subscriptions.add(this.visualisationApiService.getVideoFeed().subscribe((feedData: VideoFeedData) => {
      console.log(feedData);
      this.carouselItems = feedData.sections[0].itemData;
      this.carouselItems.forEach((item) => {
        this.flkty.append(this.makeCellHtml(item));
      });
    }));
  }

  private makeCellHtml(item: VideoFeedItem): Element {
    const element = document.createElement('div');
    element.classList.add('carousel-cell');

    element.innerHTML = `${item.metaData.title}`;

    return element;
  }
}
