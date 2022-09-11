import React from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import GithubIcon from '@mui/icons-material/GitHub';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import Tooltip from '@mui/material/Tooltip';
import MusicNoteIcon from '@mui/icons-material/MusicNote';


function Home(): JSX.Element {

    const navigateHook = useNavigate();

    const GoLink = (link: string) => (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        navigateHook(link)
    } 

    return (
        <Container>
            <Box>
                {/* Home main content */}
                <Paper sx={{m: 1, p: 2, backgroundImage: "linear-gradient(to bottom, #ECE9E6, #FFFFFF)"}}>
                    <Typography variant="h6">What is LyricsFinder?</Typography>

                    <Typography variant="subtitle1">
                        LyricsFinder is an online free-to-use open source web application which can scan the lyrics of a spotify playlist for keywords or "phrases" playing at the back of your head. 
                    </Typography>

                    <Typography variant="subtitle1">
                        It started as a simple python CLI (command line interface) for me to play around with the <Link href="https://developer.spotify.com/" target="_blank">Spotify</Link> and <Link href="https://docs.genius.com/" target="_blank">Genius</Link> developers API. As it grew, I decided to make it "usable" by non-developers so that I could share my fun little project with other people.
                        <Divider sx={{my:2}} />
                        For you geeks out there, I have decided to make this an open source project which you can view in the following github repositories.
                    </Typography>
                    
                    <Box display="flex" alignItems="center" my={1}>
                        <GithubIcon/>
                        <Typography sx={{fontWeight: "bold", textDecoration: "underline", ml: 1}}>Github repositories</Typography>
                    </Box>
                    <Box pl={3}>
                        <Typography>
                            - <Link href="https://github.com/M-ArafatZaman/LyricsFinder/" target="_blank">LyricsFinder Python CLI</Link>
                        </Typography>
                    </Box>
                </Paper>

                {/* Services links */}
                <Paper sx={{m: 1, p: 2, backgroundImage: "linear-gradient(to bottom, #ECE9E6, #FFFFFF)"}}>
                    <Box display="flex" alignItems="center" mb={1}>
                        <SearchIcon/>
                        <Typography variant="h6" sx={{textDecoration: "underline", ml: 1}} >Search</Typography>
                    </Box>
                    {/* Buttons */}
                    <Box pl={3} display="inline-flex" flexDirection="column" justifyContent="stretch">

                        <Tooltip title="Scan a spotify playlist" placement='right'>
                            <Button
                                startIcon={<QueueMusicIcon/>}
                                variant="contained"
                                sx={{backgroundImage: "linear-gradient(120deg, #1db954, #191414)", mb: 1}}
                                fullWidth
                                onClick={GoLink("/search-playlist/")}
                            >Playlist</Button>
                        </Tooltip>
                        
                        {/* Coming soon buttons */}
                        <Tooltip title="Scan a spotify album (In development)" placement="right">
                            <Box>
                                <Button
                                    startIcon={<LibraryMusicIcon/>}
                                    variant="contained"
                                    sx={{backgroundColor: "#1db954", mb: 1}}
                                    fullWidth
                                    disabled
                                >Album</Button>
                            </Box>
                        </Tooltip>

                        <Tooltip title="Scan a spotify artist's songs (In development)" placement="right">
                            <Box>
                                <Button
                                    startIcon={<MusicNoteIcon/>}
                                    variant="contained"
                                    sx={{backgroundColor: "#1db954"}}
                                    fullWidth
                                    disabled
                                >Artist</Button>
                            </Box>
                        </Tooltip>
                    </Box>
                </Paper>
            </Box>

        </Container>
        
    )
}

export default Home;