import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from '../logo/LyricsFinder-logo.svg';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StorageIcon from '@mui/icons-material/Storage';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';

function Header(): JSX.Element {
    /* 
    The header used throughout the webapp
    */

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Open and change functions
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

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
                            <IconButton size="large" onClick={handleOpen}>
                                <GitHubIcon fontSize="large"/>
                            </IconButton>
                        </Tooltip>

                        {/* The menu */}
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            onClose={handleClose}
                        >   
                            {/* The python CLI */}
                            <MenuItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <AccountTreeIcon/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        Python CLI
                                    </ListItemText>
                                </ListItem>
                            </MenuItem>

                            {/* The flask backend */}
                            <MenuItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <StorageIcon/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        Flask backend
                                    </ListItemText>
                                </ListItem>
                            </MenuItem>

                            {/* The python CLI */}
                            <MenuItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <LaptopMacIcon/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        Typescript frontend
                                    </ListItemText>
                                </ListItem>
                            </MenuItem>
                        </Menu>
                
                    </Toolbar>
                </Container>
            </AppBar>

        </Box>
    )
};

export default Header;