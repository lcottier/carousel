import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { VisualisationApiService } from './shared/services/api/visualisations-api/visualisations-api.service';
import { VideoFeedData, VideoFeedSection } from './shared/models/video-feed-data.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'carousel';
  sections = new Array<VideoFeedSection>();
  subscriptions = new Subscription();

  constructor(private visualisationApiService: VisualisationApiService, private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscriptions.add(this.visualisationApiService.getVideoFeed().subscribe((feedData: VideoFeedData) => {
      this.sections = feedData.sections;
      this.changeDetection.detectChanges();
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
