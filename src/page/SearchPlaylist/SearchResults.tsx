import * as React from 'react';
import {_parseGetQueryToURLQuery} from '../../utils';
import { SearchPlaylistAPIResponse, Snippet } from './api_response_types';
import SnippetContent from './SnippetContent';
// MUI components
import {SxProps} from '@mui/material/styles';
import GREEN from '@mui/material/colors/green';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {grey} from '@mui/material/colors';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Icon from '@mui/material/Icon';
import Divider from '@mui/material/Divider';
import LyricsIcon from '@mui/icons-material/Lyrics';
import Dialog from '@mui/material/Dialog';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

// ListContent Component
interface ListContentProps {
    name: string;
    artists: string;
    lyrics: string;
    snippets: Snippet[];
    url: string;
    previewURL: string;
    geniusURL: string;
    isLast: boolean;
}

function ListContent(props: ListContentProps): JSX.Element {
    /* This functional component is used by SearchResults to display each item */

    const {name, artists, lyrics, snippets, url, previewURL, geniusURL, isLast} = props;

    // Lyrics and dialog functions
    const [open, setOpen] = React.useState<boolean>(false);
    const handleClose = () => { setOpen(false); };
    const _LYRICS = lyrics.split("\n");

    // Snippet Container style
    const SnippetContainerStyle: SxProps = {
        my: 1, py: 1, px: 2,
        display: "inline-block",
        borderLeft: `4px solid ${GREEN["A700"]}`
    };

    return (
        <React.Fragment>
            {/* Song name and artist name */}
            <Typography>{name}</Typography>
            <Typography variant="body2" color="textSecondary">{artists}</Typography>
            
            {/* Snippets */}
            <Paper sx={SnippetContainerStyle}>
                {snippets.map((eachSnippet, index) => (
                    <SnippetContent key={index} keyword={eachSnippet.keyword} snippet={eachSnippet.snippet} />
                ))}
            </Paper>
            
            {/* Links */}
            <Box sx={{mb: 1}}>
                {/* Spotify link */}
                <Button
                    startIcon={<Icon className="fab fa-spotify" />}
                    sx={{
                        backgroundColor: "#1db954",
                        ':hover': {
                            backgroundColor: "#13823A"
                        }
                    }}
                    variant="contained"
                    href={url}
                    target="_blank"
                >Listen on spotify</Button>
            </Box>
            <Box>
                {/* Read lyrics */}
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
                    onClick={() => { setOpen(true) }}
                >View lyrics</Button>
            </Box>
            
            
            {!isLast && (<Divider sx={{mt: 1}} />)}

            {/* Dialog for lyrics */}
            <Dialog 
                open={open}
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
                    <Typography variant="caption" color="textSecondary">Source: <Link href={geniusURL} target="_blank">Genius.com</Link></Typography>
                   
                    <Divider sx={{mt: 1, mb: 2}} />
                    {/* Song name */}
                    <Typography variant="h5" textAlign="center" sx={{my: 1}}>{name} - {artists}</Typography>

                    {/* Lyrics */}
                    <Box sx={{backgroundColor: "#E3E3E3", p: 1}}>
                        {_LYRICS.map((eachLyrics, i) => {
                            if (eachLyrics === "") {
                                return <br/>
                            } else {
                                return <Typography key={i}>{eachLyrics}</Typography>
                            }
                        })}
                    </Box>

                    {/* Close button */}
                    <Divider sx={{my: 1}} />
                    <Button color="primary" onClick={handleClose}>Close</Button>
                    
                </Box>
            </Dialog>
        </React.Fragment>
    )
}


// Main SearchResults component
interface SearchResultsInterface {
    searchResults: SearchPlaylistAPIResponse;
}

function SearchResults(props: SearchResultsInterface): JSX.Element {
    /* This functional component displays all the result from the fetch API from the prev step */
    const {searchResults} = props;

    return (
        <Box>
            <List sx={{
                width: "100%",
                my: 1,
                border: `1px solid ${grey["300"]}`,
                py: 1
            }} disablePadding>
            {   
                searchResults.data?.map((eachTrack, index) => (
                    <ListItem alignItems="flex-start" key={index} sx={{py: 0}}>
                        {/* Image */}
                        <ListItemAvatar>
                            <Avatar alt="Album cover" src={eachTrack.imageURL} variant="square" />
                        </ListItemAvatar>
                        {/* Song name with artist names as secondary */}
                        <ListItemText disableTypography>
                            <ListContent
                                name={eachTrack.name}
                                artists={eachTrack.artists}
                                lyrics={eachTrack.lyrics}
                                snippets={eachTrack.snippets}
                                url={eachTrack.url}
                                previewURL={eachTrack.previewURL}
                                geniusURL={eachTrack.geniusURL}
                                isLast={(searchResults.data?.length as number) - 1 === (index)}
                            />
                        </ListItemText>
                    </ListItem>
                ))
            }
            </List>

        </Box>
    )
}

export default SearchResults;