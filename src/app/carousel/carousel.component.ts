import { Component, AfterViewInit, OnInit, OnDestroy, Renderer2 } from '@angular/core';
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
  mobile = false;
  title = 'Latest Videos';

  constructor(private visualisationApiService: VisualisationApiService, private renderer: Renderer2) { }

  ngOnInit(): void {

    if (window.innerWidth <= 480) { // 768px portrait
      this.mobile = true;
    }

    this.getFeed();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngAfterViewInit(): void {
    // tslint:disable-next-line: no-unused-expression
    this.flkty = new Flickity('.main-carousel', {
      // options
      cellAlign: 'center',
      contain: false,
      cellSelector: '.carousel-cell',
      pageDots: false,
      prevNextButtons: false
    });
  }

  canCarouselPrevious(): boolean {
    if (this.flkty && this.carouselItems) {
      return this.flkty.selectedIndex !== 0;
    }
    return false;
  }

  carouselPrevious(): void {
    this.flkty.previous();
  }

  canCarouselNext(): boolean {
    if (this.flkty && this.carouselItems) {
      return this.flkty.selectedIndex !== this.carouselItems.length - 1;
    }
    return false;
  }

  carouselNext(): void {
    this.flkty.next();
  }

  private getFeed(): void {
    this.subscriptions.add(this.visualisationApiService.getVideoFeed().subscribe((feedData: VideoFeedData) => {
      console.log(feedData);
      this.title = feedData.sections[0].name;
      this.carouselItems = feedData.sections[0].itemData;
      this.carouselItems.forEach((item) => {
        this.flkty.append(this.makeCellHtml(item));
      });
    }));
  }

  private makeCellHtml(item: VideoFeedItem): Element {
    const element = this.renderer.createElement('cell');
    this.renderer.addClass(element, 'carousel-cell');

    element.innerHTML = `
      <div>
        <div style="position: relative; height: 136px">
          <img width="100%" style="position: absolute;" src="${item.mediaData.thumbnailUrl}" alt="Video Thumbnail">
          <div
            id="overlay_text"
            style="position: absolute; bottom: 0px; z-index: 3; background-color: rgba(0, 0, 0, 0.6); color: white; padding: 5px">
            ${this.getDuration(item.metaData.VideoDuration)}
          </div>
        </div>
      </div>
      <div style="margin-top: 5px">${item.metaData.title}</div>
    `;

    return element;
  }

  private getDuration(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;

    return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
  }
}
