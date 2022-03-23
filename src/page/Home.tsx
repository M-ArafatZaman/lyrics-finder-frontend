import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import GithubIcon from '@mui/icons-material/GitHub';


function Home(): JSX.Element {

    return (
        <Container>
            <Box>
                <Paper sx={{m: 1, p: 2, backgroundImage: "linear-gradient(to right, #ECE9E6, #FFFFFF)"}}>
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
            </Box>

        </Container>
        
    )
}

export default Home;