import * as React from 'react';
import {_parseGetQueryToURLQuery, QueryObject, onEnter} from '../../utils';
import {API_WEBSITE, SEARCH_PLAYLIST_ENDPOINT, GET_GENIUS_RESPONSE_TIME, SCAN_SONG_ENDPOINT} from './endpoints';
import {SnackbarStateInterface} from './index';
import { useTheme, SxProps } from '@mui/material/styles';
import { SearchPlaylistAPIResponse, LoadCompletePlaylistAPIResponse, ScanSongAPIResponse } from './api_response_types';
// MUI components
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
// Page components
import EstimatedTimeRemaining from './EstimatedTimeRemaining';
import ListSongs from './ListSongs';

interface SearchPlaylistDetailsInterface {
    playlistURL: string;
    showSnackbar: (newState: Partial<SnackbarStateInterface>) => void;
    setSearchResults: React.Dispatch<React.SetStateAction<SearchPlaylistAPIResponse>>;
    completePlaylistResponse: LoadCompletePlaylistAPIResponse;
}

function SearchPlaylistDetails(props: SearchPlaylistDetailsInterface): JSX.Element {
    const {playlistURL, showSnackbar, setSearchResults, completePlaylistResponse} = props;

    const [keywords, setKeywords] = React.useState<string>("");
    // This state searches for songs individually and stores it in local state before updating to
    // the parent state using setSearchResults
    const [results, setResults] = React.useState<ScanSongAPIResponse["data"][]>([]);


    // While the request is in progress
    const [isLoading, setLoading] = React.useState<boolean>(false);
    // Cleanup function 
    React.useEffect(() => {

        return () => {
            setLoading(false);
        }
    }, []);
    
    

    // Search playlist from endpoint
    function searchPlaylist<T extends React.MouseEvent | React.KeyboardEvent>(event: T ): void {
        event.stopPropagation();
        setLoading(true);
        showSnackbar({
            message: "Scanning playlist. This may take a while...",
            severity: "info"
        })

        const QUERY: QueryObject = {
            url: playlistURL,
            search: keywords
        }
        const _query: string = _parseGetQueryToURLQuery(QUERY);
        const URL = `${API_WEBSITE}${SEARCH_PLAYLIST_ENDPOINT}?${_query}`;

        // Send the request
        fetch(URL, {
            mode: "cors",
            method: "GET"
        })
        .then(response => response.json())
        .then(response => {
            // Successfully received a response from server
            if (response.status === 200) {
                // Successfully received data
                setSearchResults(response as SearchPlaylistAPIResponse)
                showSnackbar({
                    message: response.message,
                    severity: "success"
                })
            } else {
                showSnackbar({
                    message: response.message,
                    severity: "error"
                })
            }
        })
        .catch((e) => {
            // Fetch was rejected/unable to connect to server
            showSnackbar({
                message: "Failed to connect to server",
                severity: "error"
            })
        })
        .finally(() => {
            setLoading(false);
        })

    }

    /* 
    Instead of searching for ALL the songs in the server, send batch requests to scan songs 
    */
    const [songsSearched, setSongsSearched] = React.useState<number>(0);
    const TotalSongsCount = completePlaylistResponse.data?.items.length as number;
    React.useEffect(() => {
        /* 
        Since every songs are searched seperately, we need to identify when all the songs have been searched.
        When all has been searched, stop loading, and update search results using setSearchResults
        */
        if (songsSearched === TotalSongsCount) {
            setLoading(false);
            showSnackbar({
                message: "Found matches.",
                severity: "success"
            });
            console.log(results);
        }
    }, [songsSearched]);

    // The function which asynchronously searches all songs
    function searchCompletePlaylist<T extends React.MouseEvent | React.KeyboardEvent>(event: T): void {
        event.stopPropagation();
        setLoading(true);
        showSnackbar({
            message: "Scanning playlist. This may take a while...",
            severity: "info"
        })


        // Iterate through each song
        completePlaylistResponse.data?.items.forEach((item) => {

            // Generate endpoint with parameters
            const parameters: QueryObject = {
                songname: item.name,
                artists: item.artists,
                keywords: keywords
            }
            const _Q: string = _parseGetQueryToURLQuery(parameters);
            const ENDPOINT: string = `${API_WEBSITE}${SCAN_SONG_ENDPOINT}?${_Q}`;
            
            fetch(ENDPOINT, {
                method: "GET",
                mode: "cors"
            })
            .then((resp) => resp.json())
            .then((response: ScanSongAPIResponse) => {
                /* 
                A response status of i means:
                    0   = No lyrics found
                    200 = Lyrics found
                    -1  = An error occured
                */
                if (response.status === 200) {
                    // Lyrics found
                    setResults((prevResults) => [...prevResults, response.data]);
                }
            })
            .finally(() => {
                setSongsSearched((v) => v+1);
            })
        });
    }

    // Some styles
    const AppTheme = useTheme();

    const SearchButtonStyle: SxProps = {
        ...(!isLoading && {
            backgroundImage: `linear-gradient(120deg, ${AppTheme.palette.info.light}, ${AppTheme.palette.info.dark})`
        })
    }

    return (
        <Box>
            {/* Loader */}
            {
                //isLoading && (<EstimatedTimeRemaining totalSongs={totalSongs} />)
            }
            
            {/* Search keywords */}
            <Box my={2}>
                <TextField
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="Search lyrics"
                    fullWidth
                    sx={{
                        my: 2,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 8,
                            paddingLeft: 2
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'><SearchIcon/></InputAdornment>
                        )
                    }}
                    onKeyDown={onEnter((e) => { searchCompletePlaylist(e) })}
                />
            </Box>
            
            {/* List of songs */}
            <Box>
                {
                    completePlaylistResponse.data?.items && 
                    (<ListSongs items={completePlaylistResponse.data?.items}/>)
                }
            </Box>

            {/* Search button */}
            <Box sx={{position: "relative"}}>
                <Button
                    variant='contained'
                    color='primary'
                    sx={SearchButtonStyle}
                    fullWidth
                    startIcon={<SearchIcon/>}
                    onClick={searchCompletePlaylist}
                    disabled={isLoading}
                >Search playlist</Button>

                {
                    isLoading && (
                        <CircularProgress 
                            color="secondary"
                            size={24}
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                marginTop: "-12px",
                                marginLeft: "-12px"
                            }}
                        />
                    )
                }
            </Box>
        </Box>
    )
}

export default SearchPlaylistDetails;