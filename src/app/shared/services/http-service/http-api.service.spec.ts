import { TestBed, async, getTestBed, inject, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpApiService } from './http-api.service';
import { HttpParams } from '@angular/common/http';

describe('HttpApiService', () => {
    let injector: TestBed;
    let service: HttpApiService;
    let httpMock: HttpTestingController;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                HttpApiService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        injector = getTestBed();
        service = injector.inject(HttpApiService);
        httpMock = injector.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should', () => {
        expect(service).toBeTruthy();
    });

    it('get() should return data', () => {
        service.get('test').subscribe((res: any) => {
            expect(res).toEqual('test');
        });

        const req = httpMock.expectOne('test');
        expect(req.request.method).toBe('GET');
        req.flush('test');
    });

    it('get() should return data with params', () => {
        service.get('test', new HttpParams()).subscribe((res: any) => {
            expect(res).toEqual('test');
        });

        const req = httpMock.expectOne('test');
        expect(req.request.method).toBe('GET');
        req.flush('test');
    });
});
