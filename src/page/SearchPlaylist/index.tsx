import React, {useState, useEffect} from 'react';
import {FadeInWrapper} from '../../utils';
import {LoadPlaylistAPIResponse, SearchPlaylistAPIResponse, LoadCompletePlaylistAPIResponse, ScanSongAPIResponse} from './api_response_types';
// MUI components
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CicularProgress from '@mui/material/CircularProgress';
// Page components
import Navigation from './Navigation';
import LoadPlaylist from './LoadPlaylist';
import SearchPlaylistDetails from './SearchPlaylistDetails'
import DisplayPlaylistDetails from './DisplayPlaylistDetails';
import SearchResults from './SearchResults';


// Snackbar state interface which will exported to other components in this page
export interface SnackbarStateInterface {
    open: boolean;
    severity: "error" | "success" | "info" | undefined;
    message: string
}

function SearchPlaylist(): JSX.Element {

    // ============================= SNACKBAR FUNCTIONS=================
    // Snackbar states and detail for displaying messages from the server
    const [snackbarState, setSnackbarState] = useState<SnackbarStateInterface>({
        open: false,
        severity: undefined,
        message: ""
    });

    const showSnackbar = (newState: Partial<SnackbarStateInterface> ) => {
        setSnackbarState({
            ...snackbarState,
            severity: "success",
            ...newState,
            open: true
        } as SnackbarStateInterface);
    };

    const closeSnackbar = () => {
        setSnackbarState({
            ...snackbarState,
            open: false,
            message: ""
        } as SnackbarStateInterface);
    }

    //  ========================== APP DATA ==================================
    const [PLAYLIST_URL, SET_PLAYLIST_URL] = useState<string>("");
    const [playlistDetails, setPlaylistDetails] = useState<LoadPlaylistAPIResponse>({} as LoadPlaylistAPIResponse);
    const [completePlaylistDetails, setCompletePlaylistDetails] = useState<LoadCompletePlaylistAPIResponse>(
        {} as LoadCompletePlaylistAPIResponse
    );
    const [searchResults, setSearchResults] = useState<SearchPlaylistAPIResponse>({} as SearchPlaylistAPIResponse);

    // Listen for updates, and move on to the next step if we receive some data
    // For step 1
    useEffect(() => {
        // The "data" key contains the main data
        if ("data" in playlistDetails) {
            setActiveStep(1);
            setStepStatus({
                ...stepStatus,
                loadPlaylist: true
            } as stepStatusInterface);

        }
    }, [playlistDetails]);
    // For step 1 {UPDATED}
    useEffect(() => {
        // Update state if data is in the return data from API
        if ("data" in completePlaylistDetails) {
            setActiveStep(1);
            setStepStatus({
                ...stepStatus,
                loadCompletePlaylist: true
            } as stepStatusInterface);
        };
    }, [completePlaylistDetails])

    // For step 2
    useEffect(() => {
        // The "data" key contains the tracks
        if ("data" in searchResults) {
            setActiveStep(2);
            setStepStatus({
                ...stepStatus,
                searchResults: true
            } as stepStatusInterface);
        }
    }, [searchResults]);
 
    

    // ============================ Stepper functions =======================
    type STEPS = 0 | 1 | 2;
    const [activeStep, setActiveStep] = useState<STEPS>(0);
    // stepStatus state contains the status (completed or not) of every step
    interface stepStatusInterface {
        loadPlaylist: boolean;
        searchResults: boolean;
        // Updated
        loadCompletePlaylist: boolean;
    }
    // This step status is for indicating the <Stepper/> content ONLY
    // Only activeStep is used for determing which content to render
    const [stepStatus, setStepStatus] = useState<stepStatusInterface>({
        loadPlaylist: false,
        searchResults: false,
        // Update
        loadCompletePlaylist: false
    });

    const isStepperContentInDisplay = (id: STEPS): boolean => activeStep == id;

    // Go back to the prev step
    const goBackStep = () => {
        if (activeStep === 0) return;

        // If in 2nd step
        if (activeStep === 1) {
            setActiveStep(0);
            setStepStatus({
                ...stepStatus,
                loadPlaylist: false,
                loadCompletePlaylist: false
            } as stepStatusInterface);
            setPlaylistDetails({} as LoadPlaylistAPIResponse);
            setCompletePlaylistDetails({} as LoadCompletePlaylistAPIResponse);
        }

        // If in 3rd step
        if (activeStep === 2) {
            setActiveStep(1);
            setStepStatus({
                ...stepStatus,
                searchResults: false
            } as stepStatusInterface);
            setSearchResults({} as SearchPlaylistAPIResponse);
        }
    }


    


    return (
        <Container>
            <Box>
                <Paper sx={{m: 1, p: 2, backgroundImage: "linear-gradient(to bottom, #ECE9E6, #FFFFFF)"}}>
                    <Navigation/>

                    <Divider sx={{my: 1}} />

                    <Box display="flex" alignItems="center" mb={1}>
                        <SearchIcon/>
                        <Typography variant="h6" sx={{ml: 1, textDecoration: "underline"}}>Search playlist</Typography>
                    </Box>
                    
                    {/* Contents */}
                    <Box my={1}>
                        {/* Steppers */}
                        <Box my={2}>
                            <Stepper activeStep={activeStep}>
                                {/* First step - Load playlist */}
                                <Step completed={stepStatus.loadCompletePlaylist}>
                                    {/* Label */}
                                    <StepLabel>
                                        Load a playlist
                                    </StepLabel>
                                </Step>

                                {/* Second step - Enter search term */}
                                <Step completed={stepStatus.searchResults}>
                                    {/* Label */}
                                    <StepLabel>
                                        Search lyrics
                                    </StepLabel>
                                </Step>

                                {/* 3rd step - Songs found */}
                                <Step completed={false}>
                                    {/* Label */}
                                    <StepLabel>
                                        Songs found
                                    </StepLabel>
                                </Step>
                            </Stepper>
                        </Box>

                        {/* Step content */}
                        <Box>
                            {/* Step 1 - Load playlist */}
                            {
                                isStepperContentInDisplay(0) && (
                                    <FadeInWrapper>
                                        <LoadPlaylist
                                            playlistURL={PLAYLIST_URL}
                                            setPlaylistURL={SET_PLAYLIST_URL}
                                            showSnackbar={showSnackbar}
                                            setPlaylistDetails={setPlaylistDetails}
                                            setCompletePlaylistDetails={setCompletePlaylistDetails}
                                        />
                                    </FadeInWrapper>
                                )
                            }

                            {/* Step 2 - Search the playlist for lyrics */}
                            {
                                isStepperContentInDisplay(1) && (
                                    <FadeInWrapper>
                                        <React.Fragment>
                                            <DisplayPlaylistDetails
                                                playlistDetails={playlistDetails}
                                                completePlaylistDetails={completePlaylistDetails}
                                            />
                                            <SearchPlaylistDetails
                                                playlistURL={PLAYLIST_URL}
                                                showSnackbar={showSnackbar}
                                                setSearchResults={setSearchResults}
                                                totalSongs={playlistDetails.data?.tracks.total}
                                            />
                                        </React.Fragment>
                                    </FadeInWrapper>
                                )
                            }

                            {/* Step 3 - Display search results */}
                            {
                                isStepperContentInDisplay(2) && (
                                    <FadeInWrapper>
                                        <React.Fragment>
                                            <DisplayPlaylistDetails
                                                playlistDetails={playlistDetails}
                                                completePlaylistDetails={completePlaylistDetails}
                                            />
                                            <SearchResults
                                                searchResults={searchResults}
                                            />
                                        </React.Fragment>
                                    </FadeInWrapper>
                                )
                            }
                        </Box>
                    </Box>

                    {/* Go back button */}
                    {activeStep > 0 && (
                        <React.Fragment>
                            <Divider sx={{my: 2}} />
                            <Box display="flex" flexDirection="row">
                                <Button color="primary" onClick={goBackStep}>Go back</Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
            </Box>
            

            {/* Snackbar for messages from server */}
            <Snackbar
                open={snackbarState.open}
                autoHideDuration={6000}
                onClose={closeSnackbar}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
            >
                <Alert variant="filled" onClose={closeSnackbar} severity={snackbarState.severity}>
                    {snackbarState.message}
                </Alert>
            </Snackbar>
            
        </Container>
        
    )
}

export default SearchPlaylist;