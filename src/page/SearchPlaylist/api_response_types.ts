// Spotify's Image response
interface SpotifyImageResponse {
    height: number | null;
    url: string;
    width: number | null;
}

// The response from '/load-playlist/'
interface LoadPlaylistAPIResponse {
    status: number;
    message: string;
    data?: {
        external_urls: {
            spotify: string;
        };
        description: string;
        name: string;
        images: SpotifyImageResponse[];
        owner: {
            name: string;
            url: string;
            images: SpotifyImageResponse[];
        };
        followers: {
            total: number;
        };
        tracks: {
            total: number;
        }
    };
};

// Interface for sippets
interface Snippet {
    keyword: string;
    snippet: string;
}

// Interface for each track
interface Track {
    name: string;
    lyrics: string;
    snippets: Snippet[];
    imageURL: string;
    artists: string;
    url: string;
    previewURL: string;
    geniusURL: string;
}

// The response from '/search-playlist/
interface SearchPlaylistAPIResponse {
    status: number;
    message: string;
    data?: Track[]
}


// UPDATED

/* The items from /load-complete-playlist/ endpoint */
interface PlaylistItems {
    artists: string;
    imageURL: string;
    name: string;
    url: string;
}

/* THE RESPONSE FROM /load-complete-playlist/ */
interface LoadCompletePlaylistAPIResponse {
    status: number;
    message: string;
    data?: {
        has_all_tracks: boolean;
        items: PlaylistItems[];
        playlist: {
            description: string;
            external_urls: {
                spotify: string;
            };
            followers: {
                total: number;
            };
            images: SpotifyImageResponse[];
            name: string;
            owner: {
                images: SpotifyImageResponse[];
                name: string;
                url: string;
            };
            tracks: {
                total: number;
            }
        }
    };
}

/* THE RESPONSE FROM /scan-song/ */
interface ScanSongAPIResponse {
    status: number;
    message: string;
    data?: {
        artists: string;
        geniusURL: string;
        lyrics: string;
        name: string;
        snippets: Snippet[];
    }
}

/* THE RESPONSE FROM /get-lyrics */
interface GetLyricsAPIResponse {
    status: number;
    message: string;
    data?: {
        geniusURL: string;
        lyrics: string;
    }
}

/* THE RESPONSE FROM /get-genius-response-time/ */
interface GetGeniusResponseTimeAPIResponse {
    time: number;
}

export type {
    LoadPlaylistAPIResponse, 
    SpotifyImageResponse, 
    SearchPlaylistAPIResponse,
    Track,
    Snippet
};