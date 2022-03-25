import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from '../logo/LyricsFinder-logo.svg';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton'

function Header(): JSX.Element {
    /* 
    The header used throughout the webapp
    */
    return (
        <Box>
            <AppBar
                sx={{
                    background: "#C5C5C5",
                    color: "#474747",
                    position: "relative"
                }}
            >
                <Container>
                    <Toolbar >
                        {/* Start content */}
                        <img src={logo} style={{width: 75, height: 75}} />

                        {/* Name */}
                        <Box minHeight="100%" sx={{ml: 2}} alignItems="top" flexGrow={1}>
                            <Typography variant="h5" sx={{color: "secondary.main"}}>
                                LyricsFinder
                            </Typography>
                            <Typography variant="caption">
                                Powered by Spotify and Genius API
                            </Typography>
                        </Box>

                        {/* Github link */}
                        <Tooltip title="View project on Github" placement="bottom">
                            <IconButton size="large" href="https://github.com/M-ArafatZaman/LyricsFinder" target="_blank">
                                <GitHubIcon fontSize="large"/>
                            </IconButton>
                        </Tooltip>
                
                    </Toolbar>
                </Container>
            </AppBar>

        </Box>
    )
};

export default Header;