export class VideoFeedData {
    feedMetaData: VideoFeedMetaData;
    sections: Array<VideoFeedSection>;
}

export class VideoFeedMetaData {
    description: string;
    id: string;
    name: string;
    target: string;
    title: string;
}

export class VideoFeedSection {
    id: string;
    name: string;
    pagingData: VideoFeedPagingData;
    itemData: Array<VideoFeedItem>;
}

export class VideoFeedPagingData {
    itemCount: number;
    pageCount: number;
    pageIndex: number;
    pageSize: number;
    totalCount: number;
}

export class VideoFeedItem {
    id: string;
    publicationData: VideoFeedItemPublicationData;
    mediaData: VideoFeedItemMediaData;
    metaData: VideoFeedItemMetaData;
}

export class VideoFeedItemPublicationData {
    createdAt: string;
    releaseFrom: string;
    releaseTo: string;
    updatedAt: string;
    released: boolean;
}

export class VideoFeedItemMediaData {
    entryId: string;
    entryStatus: string;
    mediaType: string;
    thumbnailUrl: string;
}

export class VideoFeedItemMetaData {
    SysEntryEntitlements: Array<any>;
    VideoDuration: number;
    contenttags: Array<string>;
    corecategories: Array<string>;
    people: Array<string>;
    tags: Array<string>;
    teams: Array<string>;
    tvshowcategories: Array<string>;
    title: string;
    body: any;
}
