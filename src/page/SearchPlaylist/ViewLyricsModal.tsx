import React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CloseIcon from '@mui/icons-material/Close';

// Function props
interface ViewLyricsModalProps {
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    songName: string;
    artists: string;
}

function ViewLyricsModal(props: ViewLyricsModalProps) {
    
    const {modal, setModal, songName, artists} = props;

    // Handle close
    const handleClose = () => { setModal(false); };

    return (
        <Dialog 
            open={modal}
            onClose={handleClose}
            fullWidth={true}
            keepMounted={true}
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
                 
                {/* Lyrics */}
                {/* <Box sx={{backgroundColor: "#E3E3E3", p: 1}}>
                    {_LYRICS.map((eachLyrics, i) => {
                        if (eachLyrics === "") {
                            return <br/>
                        } else {
                            return <Typography key={i}>{eachLyrics}</Typography>
                        }
                    })}
                </Box>
 */}
                {/* Close button */}
                <Divider sx={{my: 1}} />
                <Button color="primary" onClick={handleClose}>Close</Button>
                
            </Box>
        </Dialog>
    )
};

export default ViewLyricsModal;