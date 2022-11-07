import React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';

// Function props
interface ViewLyricsModalProps {
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function ViewLyricsModal(props: ViewLyricsModalProps) {
    
    const {modal, setModal} = props;

    // Handle close
    const handleClose = () => { setModal(false); };

    return (
        <Dialog 
            open={modal}
            onClose={handleClose} 
        >
            <Box></Box>
        </Dialog>
    )
};

export default ViewLyricsModal;