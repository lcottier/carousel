import { VisualisationApiService } from './visualisations-api.service';
import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { HttpApiService } from '../../http-service/http-api.service';

describe('VisualisationApiService', () => {
    let injector: TestBed;
    let service: VisualisationApiService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                VisualisationApiService,
                { provide: HttpApiService, useValue: { get: () => { } } },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        injector = getTestBed();
        service = injector.get(VisualisationApiService);
    });

    it('should', () => {
        expect(service).toBeTruthy();
    });

    it('getLocalCity should', inject([HttpApiService], (httpApiService: HttpApiService) => {
        spyOn(httpApiService, 'get');
        service.getVideoFeed();
        expect(httpApiService.get).toHaveBeenCalled();
    }));
});
