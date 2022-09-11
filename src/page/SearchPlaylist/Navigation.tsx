import React from 'react';
import {useNavigate, useNavigationType} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';


function Navigation(): JSX.Element {

    const navigateHook = useNavigate();
    const navigationType = useNavigationType();

    const GoBack = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        
        // Check navigation type. 
        // PUSH means the user came here programmatically without contacting the server
        if (navigationType == "PUSH") {
            // Go back
            navigateHook(-1)
        } else {
            navigateHook("/")
        }
    }

    return (
        <Tooltip title="Go to home page" placement="right">
            <Button
                startIcon={<ArrowBackIcon/>}
                onClick={GoBack}
                sx={(theme) => ({backgroundImage: `linear-gradient(120deg, ${theme.palette.primary.light}, ${theme.palette.secondary.dark})`})}
                variant="contained"
            >Home</Button>
        </Tooltip>
    )
}

export default Navigation;