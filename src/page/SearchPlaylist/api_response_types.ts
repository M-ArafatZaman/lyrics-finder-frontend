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



export type {
    LoadPlaylistAPIResponse, 
    SpotifyImageResponse, 
    SearchPlaylistAPIResponse,
    Track,
    Snippet
};