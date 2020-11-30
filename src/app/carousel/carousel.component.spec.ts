import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CarouselComponent } from './carousel.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VisualisationApiService } from '../shared/services/api/visualisations-api/visualisations-api.service';
import { of } from 'rxjs';
import { VideoFeedData, VideoFeedSection, VideoFeedItem, VideoFeedItemMediaData, VideoFeedItemMetaData } from '../shared/models/video-feed-data.model';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set carouselItems and title', inject([],
    () => {
      const testData = { name: 'test', itemData: [] } as VideoFeedSection;
      component.section = testData;
      component.ngAfterViewInit();
      expect(component.title).toBe('test');
      expect(component.carouselItems).toEqual([]);
    }));

  it('onInit sets mobile to true if screen is small', inject([],
    () => {
      const testData = { name: 'test', itemData: [] } as VideoFeedSection;
      component.section = testData;
      spyOnProperty(window, 'innerWidth').and.returnValue(300);
      window.dispatchEvent(new Event('resize'));
      component.ngOnInit();
      expect(component.mobile).toBe(true);
    }));

  it('canCarouselPrevious should return falsy when at index 0', inject([],
    () => {
      const testData = { name: 'test', itemData: [] } as VideoFeedSection;
      component.section = testData;
      component.ngAfterViewInit();
      component.flkty = { selectedIndex: 0 } as Flickity;
      component.carouselItems = [{} as VideoFeedItem];
      expect(component.canCarouselPrevious()).toBe(false);
    }));

  it('canCarouselPrevious should return falsy when at index not 0', inject([],
    () => {
      const testData = { name: 'test', itemData: [] } as VideoFeedSection;
      component.section = testData;
      component.ngAfterViewInit();
      component.flkty = { selectedIndex: 1 } as Flickity;
      component.carouselItems = [{} as VideoFeedItem, {} as VideoFeedItem];
      expect(component.canCarouselPrevious()).toBe(true);
    }));

  it('canCarouselNext should return falsy when at index carouselItem.length - 1', inject([],
    () => {
      const testData = { name: 'test', itemData: [] } as VideoFeedSection;
      component.section = testData;
      component.ngAfterViewInit();
      component.flkty = { selectedIndex: 1 } as Flickity;
      component.carouselItems = [{} as VideoFeedItem, {} as VideoFeedItem];
      expect(component.canCarouselNext()).toBe(false);
    }));

  it('canCarouselNext should return falsy when at index not 0', inject([],
    () => {
      const testData = { name: 'test', itemData: [] } as VideoFeedSection;
      component.section = testData;
      component.ngAfterViewInit();
      component.flkty = { selectedIndex: 0 } as Flickity;
      component.carouselItems = [{} as VideoFeedItem, {} as VideoFeedItem];
      expect(component.canCarouselNext()).toBe(true);
    }));

  it('carouselPrevious calls flkty previous', inject([],
    () => {
      const testData = { name: 'test', itemData: [] } as VideoFeedSection;
      component.section = testData;
      const flkty = { previous(isWrapped?: boolean): void { } } as Flickity;
      spyOn(flkty, 'previous');
      component.flkty = flkty;
      component.carouselPrevious();
      expect(flkty.previous).toHaveBeenCalled();
    }));

  it('carouselNext calls flkty previous', inject([],
    () => {
      const testData = { name: 'test', itemData: [] } as VideoFeedSection;
      component.section = testData;
      const flkty = { next(isWrapped?: boolean): void { } } as Flickity;
      spyOn(flkty, 'next');
      component.flkty = flkty;
      component.carouselNext();
      expect(flkty.next).toHaveBeenCalled();
    }));

  it('getFeed calls flkty append', inject([],
    () => {
      const testData = { name: 'test', itemData: [{} as VideoFeedItem] } as VideoFeedSection;
      testData.itemData[0].metaData = { VideoDuration: 312, title: 'test' } as VideoFeedItemMetaData;
      testData.itemData[0].mediaData = { thumbnailUrl: '' } as VideoFeedItemMediaData;
      component.section = testData;
      const flkty = { append(elements): void { } } as Flickity;
      spyOn(flkty, 'append');
      component.flkty = flkty;
      component.ngAfterViewInit();
      expect(flkty.append).toHaveBeenCalled();
    }));

  it('getDuration handles single digit seconds', inject([],
    () => {
      const testData = { name: 'test', itemData: [{} as VideoFeedItem] } as VideoFeedSection;
      testData.itemData[0].metaData = { VideoDuration: 301, title: 'test' } as VideoFeedItemMetaData;
      testData.itemData[0].mediaData = { thumbnailUrl: '' } as VideoFeedItemMediaData;
      component.section = testData;
      const flkty = { append(elements): void { } } as Flickity;
      component.flkty = flkty;
      spyOn(flkty, 'append');
      component.ngAfterViewInit();
      expect(flkty.append).toHaveBeenCalled();
    }));
});
