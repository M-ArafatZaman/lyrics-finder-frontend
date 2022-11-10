import * as React from 'react';
import {_parseGetQueryToURLQuery, QueryObject, onEnter} from '../../utils';
import {API_WEBSITE, SEARCH_PLAYLIST_ENDPOINT} from './endpoints';
import {SnackbarStateInterface} from './index';
import { useTheme, SxProps } from '@mui/material/styles';
import { SearchPlaylistAPIResponse, Track, Snippet } from './api_response_types';
import replaceStringWithContent, {ReplacedContentOutputType} from '../../utils/reactStringReplace';
// MUI components
import Box from '@mui/material/Box';
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
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

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

    const {name, artists, lyrics, snippets, url, previewURL, geniusURL, isLast} = props;

    // Inside each list content, every snippet is rendered using the <SnippetContent/> component
    const SnippetContent = (props: {keyword: string, snippet: string}): JSX.Element => {

        const {keyword, snippet} = props;

        // Replace \n with lines, and replace the keyword in each string line with a span tag
        let _lines = replaceStringWithContent(snippet, "\n", () => <br/>);
        let _FinalSnippet: ReplacedContentOutputType[] = [];
        // Iterate thru each lines
        for (let i in _lines) {
            // Only replace for keyword if the current element is a string
            if (typeof _lines[i] === "string") {
                // Replace 
                const ReplacedContent = replaceStringWithContent(_lines[i] as string, new RegExp(keyword, "gi"), (match) => <span style={{textDecoration: "underline"}}>{match}</span>);
                // Add on to final snippet
                _FinalSnippet = _FinalSnippet.concat( ReplacedContent );
            } else {
                _FinalSnippet[_FinalSnippet.length] = _lines[i]
            }
        }

        return (
            <Typography color="textSecondary" sx={{fontStyle: "italic"}} fontSize={14}>
                "{_FinalSnippet.map((each, i) => <React.Fragment key={i}>{each}</React.Fragment>)}"
            </Typography>
        )
    }

    // Lyrics and dialog functions
    const [open, setOpen] = React.useState<boolean>(false);
    const handleClose = () => { setOpen(false); };
    const _LYRICS = lyrics.split("\n");
    const LyricsLineStyle: SxProps = {
        backgroundColor: ""
    }
    

    return (
        <React.Fragment>
            {/* Song name and artist name */}
            <Typography>{name}</Typography>
            <Typography variant="body2" color="textSecondary">{artists}</Typography>
            <Divider sx={{my: 1}} />
            {/* Snippets */}
            <React.Fragment>
                {snippets.map((eachSnippet, index) => (
                    <SnippetContent key={index} keyword={eachSnippet.keyword} snippet={eachSnippet.snippet} />
                ))}
            </React.Fragment>
            <Divider sx={{my: 1}} />
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
    const {searchResults} = props;

    // Some styles
    const AppTheme = useTheme();


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