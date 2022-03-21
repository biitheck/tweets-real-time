export interface Tweet {
    data: Data;
    matching_rules: Matchingrule[];
    includes?: Includes;
}

export interface Includes {
    users?: TwitterUser[];
    media?: Media[];
}

export interface Media {
    height: number;
    media_key: string;
    preview_image_url?: string;
    type: string;
    width: number;
    url?: string;
}

export interface TwitterUser {
    id: string;
    name: string;
    profile_image_url: string;
    public_metrics: Publicmetrics2;
    url: string;
    username: string;
}

export interface Publicmetrics2 {
    followers_count: number;
    following_count: number;
    tweet_count: number;
    listed_count: number;
}

export interface Matchingrule {
    id: string;
    tag: string;
}

export interface Data {
    author_id: string;
    created_at: Date;
    id: string;
    public_metrics: Publicmetrics;
    text: string;
    attachments?: Attachments;
}

export interface Attachments {
    media_keys?: string[];
}

export interface Publicmetrics {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
}
