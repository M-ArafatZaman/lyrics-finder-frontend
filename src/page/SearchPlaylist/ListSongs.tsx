import * as React from 'react';
// Page components
import { PlaylistItems } from './api_response_types';
// MUI components
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import GREY from '@mui/material/colors/grey';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import LyricsIcon from '@mui/icons-material/Lyrics';


// The list songs props types
interface ListSongsProps {
    items: PlaylistItems[];
};

// The list songs component
function ListSongs(props: ListSongsProps) {
    /* 
    The functional componenet which renders all the list of songs 
    When the playlist details is loaded.
    */
    
    const {items} = props;

    return (
        <Box my={1}>
            <List
                sx={{
                    width: "100%",
                    border: `1px solid ${GREY["300"]}`
                }}
                disablePadding
            >
            {
                items.map((each, i) => (
                    <ListItem alignItems="flex-start" key={i}>
                        {/* Avatar */}
                        <ListItemAvatar>
                            <Avatar alt="Song cover photo" src={each.imageURL} variant="square" />
                        </ListItemAvatar>
                        {/* Content */}
                        <ListItemText>
                            <>
                            <Typography>{each.name}</Typography>
                            <Typography variant="body2" color="textSecondary">{each.artists}</Typography>
                            <br/>
                            {/* Buttons */}
                            {/* Listen to spotify button */}
                            <Box mb={1}>
                                <Button
                                    startIcon={<Icon className="fab fa-spotify" />}
                                    sx={{
                                        backgroundColor: "#1db954",
                                        ':hover': {
                                            backgroundColor: "#13823A"
                                        }
                                    }}
                                    variant="contained"
                                    href={each.url}
                                    target="_blank"
                                >
                                    Listen on Spotify
                                </Button>
                            </Box>
                            {/* View Lyrics button - opens a modal */}
                            <Box>
                                <Button
                                    startIcon={<LyricsIcon />}
                                    sx={{
                                        backgroundColor: "#767676",
                                        ":hover": {
                                            backgroundColor: "#515151"
                                        }
                                    }}
                                    color="primary"
                                    variant="contained"
                                >View lyrics</Button>
                            </Box>

                            <br/>
                            {(i !== (items.length-1) && <Divider sx={{mt: 1}} />)}
                            </>
                        </ListItemText>
                    </ListItem>
                ))
            }
            </List>
        </Box>
    )
};

export default ListSongs;