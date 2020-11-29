import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CarouselComponent } from './carousel.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VisualisationApiService } from '../shared/services/api/visualisations-api/visualisations-api.service';
import { of } from 'rxjs';
import { VideoFeedData, VideoFeedSection } from '../shared/models/video-feed-data.model';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselComponent],
      imports: [HttpClientTestingModule],
      providers: [
        VisualisationApiService
      ]
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

  it('should set carouselItems and title', inject([VisualisationApiService],
    (visualisationApiService: VisualisationApiService) => {
      const testData = {} as VideoFeedData;
      testData.sections = [{ name: 'test', itemData: [] } as VideoFeedSection];
      spyOn(visualisationApiService, 'getVideoFeed').and.returnValue(of(testData));
      component.ngOnInit();
      expect(component.title).toBe('test');
      expect(component.carouselItems).toEqual([]);
    }));
});
