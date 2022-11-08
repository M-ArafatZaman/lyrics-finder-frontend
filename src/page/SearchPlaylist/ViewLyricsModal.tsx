import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CloseIcon from '@mui/icons-material/Close';
import Skeleton from '@mui/material/Skeleton';
/* API imports */
import { API_WEBSITE, GET_LYRICS_ENDPOINT } from './endpoints';
import { GetLyricsAPIResponse } from './api_response_types';
/* Utility imports */
import _parseGetQueryToURLQuery, {QueryObject} from '../../utils/_parseGetQueryToURLQuery';

// Function props
interface ViewLyricsModalProps {
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    songName: string;
    artists: string;
}

function ViewLyricsModal(props: ViewLyricsModalProps) {
    
    const {modal, setModal, songName, artists} = props;

    /* When the component <ViewLyricsModal> is mounted initially don't do anything.
     * When the modal is opened, only then go and fetch the lyrics
    */
    const [isLyricsLoaded, setIsLyricsLoaded] = useState<boolean>(false);
    const [lyrics, setLyrics] = useState<undefined | string>(undefined);
    const [geniusURL, setGeniusURL] = useState<undefined | string>(undefined);

    // When the modal is opened, and lyrics is not loaded, go and fetch lyrics
    useEffect(() => {
        // ONLY IF LYRICS IS NOT LOADED AND MODAL IS OPEN
        if (!isLyricsLoaded && modal) {
            // Generate query
            const _Q: QueryObject = {
                songname: songName,
                artists: artists
            };

            const query: string = _parseGetQueryToURLQuery(_Q);

            const URL = `${API_WEBSITE}${GET_LYRICS_ENDPOINT}?${query}`;

            fetch(URL, {
                mode: "cors",
                method: "GET",
            })
            .then((response) => response.json())
            .then((response: GetLyricsAPIResponse) => {
                if (response.status == 200 && typeof response.data != undefined) {
                    // Response was successfull
                    setLyrics(response.data?.lyrics);
                    setGeniusURL(response.data?.geniusURL);
                } else {
                    // Otherwise just display an error
                    setLyrics("Error: Unable to load lyrics.");
                }
            })
            .catch((e) => {
                setLyrics("Error: An unexpected error occured.");
            })
            .finally(() => {
                setIsLyricsLoaded(true);
            })
        }
    }, [modal]);

    // Handle close
    const handleClose = () => { setModal(false); };

    return (
        <Dialog 
            open={modal}
            onClose={handleClose}
            fullWidth={true}
            maxWidth="lg"
        >
            <Box sx={{p: 3}}>
                {/* Title */}
                <Box display="flex" flexDirection="row" alignItems="center" >
                    <MusicNoteIcon/>
                    <Typography variant="h4" sx={{ml: 1}}>Lyrics</Typography>
                    <Box flexGrow={1} />
                    <IconButton onClick={handleClose} ><CloseIcon/></IconButton>
                </Box>
                {/* 
                <Typography variant="caption" color="textSecondary">Source: <Link href={geniusURL} target="_blank">Genius.com</Link></Typography>
                 */}
                <Divider sx={{mt: 1, mb: 2}} />
                {/* Song name */}
                <Typography variant="h5" textAlign="center" sx={{my: 1}}>{songName} - {artists}</Typography>

                {/* Skeleton */}
                {!isLyricsLoaded && [1,2,3].map((e, i) => (
                    <Box key={i}>
                        <Skeleton animation="wave" height={26} width={150} />
                        <Skeleton animation="wave" height={26} width={350} />
                        <Skeleton animation="wave" height={26} width={400} />
                        <Skeleton animation="wave" height={26} width={350} />
                        <Skeleton animation="wave" height={26} width={400} />
                        <br/>
                    </Box>
                ))}

                 
                {/* Lyrics */}
                {isLyricsLoaded && <Box sx={{backgroundColor: "#E3E3E3", p: 1}}>
                    {
                        typeof lyrics === 'string' && lyrics.split("\n").map((e, i) => {
                            if (e == "") {
                                return <br/>
                            } else {
                                return <Typography key={i}>{e}</Typography>
                            }
                        })
                    }
                </Box>}

                {/* Close button */}
                <Divider sx={{my: 1}} />
                <Button color="primary" onClick={handleClose}>Close</Button>
                
            </Box>
        </Dialog>
    )
};

export default ViewLyricsModal;