import { HttpApiService } from '../../http-service/http-api.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { VideoFeedData } from 'src/app/shared/models/video-feed-data.model';

@Injectable({
    providedIn: 'root',
})
export class VisualisationApiService {

    url = 'https://thefa-cm.streamamg.com/api/v1/dc46fdad-f1f8-446f-ab50-ac44b0d77b10/fG4YqyOgfLbTvnQTjRC7YGFOFwt0BNjObLkTUvJxc6EpPK1tGC/ec6e745e-6192-4685-b69e-cb32f8d06780/en/feed/c20317ee-5a12-4142-9788-fb4232f2632a/sections/search?pageSize=15';

    constructor(private httpApiService: HttpApiService) {
    }

    getVideoFeed(): Observable<VideoFeedData> {
        return this.httpApiService.get<VideoFeedData>(this.url);
    }
}
