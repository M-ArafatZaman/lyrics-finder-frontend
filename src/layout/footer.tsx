import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { SxProps } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import PublicIcon from '@mui/icons-material/Public';
import GitHubIcon from '@mui/icons-material/GitHub';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import StorageIcon from '@mui/icons-material/Storage';
import {SvgIconProps} from '@mui/material';

// Type for LinkComponent props
interface LinkComponentProps {
    href: string,
    label: string,
    icon?: React.ReactElement<SvgIconProps>
}

// Link component which is used to insert an icon
function LinkComponent(props: LinkComponentProps): JSX.Element {
    // This styles is applied to every link 
    const LinkStyles: SxProps = {
        color: "inherit",
        ml: 1,
        '& > a': {
            color: "inherit",
            textDecoration: "none"
        },
        '& > a:hover': {
            textDecoration: "underline"
        }
    }

    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            {props.icon ? props.icon : null}
            <Typography sx={LinkStyles}>
                <Link href={props.href} target="_blank">{props.label}</Link>
            </Typography>
        </Box>
    )
}


function Footer(): JSX.Element {

    const Year = new Date().getFullYear();

    return (
        <Box sx={(theme) => ({
            backgroundColor: theme.palette.secondary.main,
            color: "#F2F3F4"
        })}>
            
            <Container>
                <Grid container spacing={1}>
                    {/* Lyrics finder */}
                    <Grid item xs={12} md={6}>
                        <Box px={2} py={3}>
                            <Typography variant="h5">LyricsFinder</Typography>
                            <Typography variant="subtitle2" sx={{ml: 1}}>- Made by Mohammad Arafat Zaman</Typography>
                        </Box>
                    </Grid>

                    {/* Follow me on my socials */}
                    <Grid item xs={12} md={6}>
                        <Box px={2} py={3}>
                            <Paper sx={{
                                //backgroundColor: "rgba(255,255,255,0.75)",
                                p: 2,
                                backgroundImage: "linear-gradient(to right, #D3CCE3, #E9E4F0)"
                            }} elevation={5}>
                                
                                {/* Github links */}
                                <Box display="flex" flexDirection="row" alignItems="center">
                                    <GitHubIcon/>
                                    <Typography fontWeight="bold" sx={{textDecoration: "underline", ml: 1}}>
                                        Follow this project on github
                                    </Typography>
                                </Box>
                                <Box ml={4} my={1}>
                                    <LinkComponent
                                        href="https://github.com/M-ArafatZaman/LyricsFinder"
                                        label="Python CLI"
                                        icon={<AccountTreeIcon/>}
                                    />
                                    <LinkComponent 
                                        href="https://github.com/M-ArafatZaman/lyrics-finder-api"
                                        label="Flask Backend"
                                        icon={<StorageIcon/>}
                                    />
                                </Box>
                                
                                <Divider sx={{color: "red"}}/>
                                {/* Personal links */}
                                <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
                                    <PublicIcon/>
                                    <Typography fontWeight="bold" sx={{textDecoration: "underline", ml: 1}}>
                                        Personal links
                                    </Typography>
                                </Box>
                                <Box ml={4} my={1}>
                                    <LinkComponent
                                        href="https://github.com/M-ArafatZaman/"
                                        label="Github"
                                        icon={<GitHubIcon/>}
                                    />
                                    <LinkComponent
                                        href="https://www.linkedin.com/in/mohammad-arafat-zaman-a15a981b1/"
                                        label="LinkedIn"
                                        icon={<LinkedInIcon sx={{color: "#0a66c2"}}/>}
                                    />
                                    <LinkComponent
                                        href="https://www.facebook.com/mdarafatzaman01/"
                                        label="Facebook"
                                        icon={<FacebookIcon sx={{color: "#3391ff"}} />}
                                    />
                                    <LinkComponent
                                        href="https://twitter.com/mdarafatzaman11"
                                        label="Twitter"
                                        icon={<TwitterIcon sx={{color: "#1DA1F2"}} />}
                                    />
                                    <LinkComponent
                                        href="https://www.instagram.com/mohammadarafatzaman/"
                                        label="Instagram"
                                        icon={<InstagramIcon sx={{color: "#CB1769"}}/>}
                                    />
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
                
                <Box display="flex" flexDirection="column" alignItems="center" sx={{backgroundColor: "rgba(255,255,255,0.1)", py: 1}}>
                    <Box>
                        <Typography textAlign="center">
                            Mohammad Arafat Zaman &copy; {Year}
                        </Typography>
                        <Divider sx={{my: 1, borderColor: "rgba(255,255,255,0.15)"}}/>
                        <Typography variant="caption" textAlign="center" sx={{display: "block", mx: "auto"}}>
                            All rights reserved
                        </Typography>
                    </Box>
                    
                </Box>
                
            </Container>
        </Box>
    )
}

export default Footer;