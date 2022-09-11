import * as React from 'react';
import {_parseGetQueryToURLQuery, QueryObject, onEnter} from '../../utils';
import {API_WEBSITE, LOAD_PLAYLIST_ENDPOINT} from './endpoints';
import {SnackbarStateInterface} from './index';
import { useTheme, SxProps } from '@mui/material/styles';
import { LoadPlaylistAPIResponse } from './api_response_types';
// MUI components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';


interface LoadPlaylistProps {
    playlistURL: string;
    setPlaylistURL: React.Dispatch<React.SetStateAction<string>>;
    showSnackbar: (P: Partial<SnackbarStateInterface>) => void;
    setPlaylistDetails: React.Dispatch<React.SetStateAction<LoadPlaylistAPIResponse>>;
}

/* 
 This is the LoadPlaylist step in the 3 steps
*/
function LoadPlaylist(props: LoadPlaylistProps): JSX.Element {
    const {playlistURL, setPlaylistURL, showSnackbar, setPlaylistDetails} = props;
    

    // Whenever a request is in progress
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    // Fix memory leak - This component is unmounted but setIsLoading is still called in a promise afterwards
    React.useEffect(() => {

        // componentWillUnmount
        return () => {
            setIsLoading(false); 
        }
    }, [])

    // use theme to update button styling based on if it is currently loading
    const AppTheme = useTheme();
    const LoadingButtonSx : SxProps = {
        // If it is not loading
        ...(!isLoading && {
            backgroundImage: `linear-gradient(120deg, ${AppTheme.palette.success.light}, ${AppTheme.palette.success.dark})`
        })
    }

    

    // Execute load button event
    function loadPlaylist<T extends React.MouseEvent | React.KeyboardEvent> (event: T) {

        event.preventDefault();
        
        setIsLoading(true);

        // The get parameters
        const QUERY: QueryObject = {
            url: `${playlistURL}`
        }
        // Convery query from an object to a url string
        const _query: string = _parseGetQueryToURLQuery(QUERY);
        
        const URL = `${API_WEBSITE}${LOAD_PLAYLIST_ENDPOINT}?${_query}`;

        // Send the fetch request
        fetch(URL, {
            method: "GET",
            mode: "cors"
        })
        .then(response => response.json())
        .then(response => {
            // Successfully received a response from server
            if (response.status === 200) {
                // Successfully received data
                setPlaylistDetails(response as LoadPlaylistAPIResponse);
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
        .catch(e => {
            // Fetch was rejected/unable to connect to server
            showSnackbar({
                message: "Failed to connect to server",
                severity: "error"
            })
        })
        .finally(() => {
            setIsLoading(false);
        })

    }


    return (
        <Box>
            {/* Input */}
            <TextField
                value={playlistURL}
                onChange={(e) => setPlaylistURL(e.target.value)}
                placeholder="Enter a spotify playlist URL"
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
                onKeyDown={onEnter((e) => { loadPlaylist(e) })}
            />

            {/* Button and loading animation */}
            <Box sx={{position: "relative"}}>
                <Button
                    variant='contained'
                    color='success'
                    sx={LoadingButtonSx}
                    fullWidth
                    startIcon={<SystemUpdateAltIcon/>}
                    onClick={loadPlaylist}
                    disabled={isLoading}
                >Load playlist</Button>

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

export default LoadPlaylist;