import * as React from 'react';
import {_parseGetQueryToURLQuery, QueryObject, onEnter} from '../../utils';
import {API_WEBSITE, SEARCH_PLAYLIST_ENDPOINT, GET_GENIUS_RESPONSE_TIME} from './endpoints';
import {SnackbarStateInterface} from './index';
import { useTheme, SxProps } from '@mui/material/styles';
import { SearchPlaylistAPIResponse, LoadCompletePlaylistAPIResponse } from './api_response_types';
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
    totalSongs: number | undefined;
    completePlaylistResponse: LoadCompletePlaylistAPIResponse;
}

function SearchPlaylistDetails(props: SearchPlaylistDetailsInterface): JSX.Element {
    const {playlistURL, showSnackbar, setSearchResults, totalSongs, completePlaylistResponse} = props;

    const [keywords, setKeywords] = React.useState<string>("");


    // While the request is in progress
    const [isLoading, setLoading] = React.useState<boolean>(false);
    // Cleanup function 
    React.useEffect(() => {

        return () => {
            setLoading(false);
        }
    }, [])
    
    

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
                isLoading && (<EstimatedTimeRemaining totalSongs={totalSongs} />)
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
                    onKeyDown={onEnter((e) => { searchPlaylist(e) })}
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
                    onClick={searchPlaylist}
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