import * as React from 'react';
import {_parseGetQueryToURLQuery, QueryObject, onEnter} from '../../utils';
import {API_WEBSITE, SCAN_SONG_ENDPOINT} from './endpoints';
import {SnackbarStateInterface} from './index';
import { useTheme, SxProps } from '@mui/material/styles';
import { SearchPlaylistAPIResponse, LoadCompletePlaylistAPIResponse, ScanSongAPIResponse, Track } from './api_response_types';
// MUI components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
// Page components
import ListSongs from './ListSongs';
import EstimatedTimeRemaining from './EstimatedTimeRemaining';

interface SearchPlaylistDetailsInterface {
    playlistURL: string;
    showSnackbar: (newState: Partial<SnackbarStateInterface>) => void;
    setSearchResults: React.Dispatch<React.SetStateAction<SearchPlaylistAPIResponse>>;
    completePlaylistResponse: LoadCompletePlaylistAPIResponse;
}

function SearchPlaylistDetails(props: SearchPlaylistDetailsInterface): JSX.Element {
    /** 
     * This is the second step of the searchPlaylist process
     * This component mainly serves the purpose of using fetch API to SCAN SONGS. 
     */

    const {playlistURL, showSnackbar, setSearchResults, completePlaylistResponse} = props;

    const [keywords, setKeywords] = React.useState<string>("");
    // This state searches for songs individually and stores it in local state before updating to
    // the parent state using setSearchResults
    const [results, setResults] = React.useState<Track[]>([]);


    // While the request is in progress
    const [isLoading, setLoading] = React.useState<boolean>(false);
    // Cleanup function 
    React.useEffect(() => {

        return () => {
            setLoading(false);
        }
    }, []);
    

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

            // Only show success snackbar if atleast 1 song is matched, else show no matches found
            if (results.length > 0) {
                showSnackbar({
                    message: "Found matches.",
                    severity: "success"
                });
                
                // Only update global results, if there are atleast one matches
                // Prepare and update global search results using setSearchResults
                setSearchResults({
                    status: 200,
                    message: "Completed search.",
                    data: results
                });
            } else {
                showSnackbar({
                    message: "No matches found.",
                    severity: "error"
                })
            }
        
        }
    }, [songsSearched]);

    // The function which asynchronously searches all songs
    function searchCompletePlaylist<T extends React.MouseEvent | React.KeyboardEvent>(event: T): void {
        event.stopPropagation();

        // Show an error if keywords is empty
        if (keywords === "") {
            showSnackbar({
                message: "Please enter a valid keyword",
                severity: "info"
            });
            return;
        }

        // Start fetching
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
                if (response.status === 200 && typeof response.data !== 'undefined') {
                    // Lyrics found
                    const responseData: Track = {
                        ...response.data,
                        imageURL: item.imageURL,
                        url: item.url,
                        previewURL: "javascript:void(0);"
                    }
                    setResults((prevResults) => [...prevResults, responseData]);
                }
            })
            .catch((e) => {
                showSnackbar({
                    severity: "error",
                    message: `An unknown error occured while scanning ${parameters.songname} - ${parameters.artists}`
                });
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
                isLoading && (<EstimatedTimeRemaining value={(songsSearched/TotalSongsCount)*100} />)
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