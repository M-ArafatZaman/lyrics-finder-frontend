import * as React from 'react';
import { SxProps } from '@mui/material/styles';
import { LoadPlaylistAPIResponse, LoadCompletePlaylistAPIResponse } from './api_response_types';
// MUI components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';

interface DisplayPlaylistDetailsInterface {
    playlistDetails: LoadPlaylistAPIResponse;
    completePlaylistDetails: LoadCompletePlaylistAPIResponse;
}

function DisplayPlaylistDetails(props: DisplayPlaylistDetailsInterface): JSX.Element {
    const {playlistDetails, completePlaylistDetails} = props;

    /* // Extract details from playlistDetail
    const playlistImage = (typeof playlistDetails.data?.images[0].url !== "undefined") ? playlistDetails.data?.images[0].url : "";
    const playlistExternalSpotifyURL = (typeof playlistDetails.data?.external_urls.spotify !== "undefined") ? playlistDetails.data?.external_urls.spotify : "";
    const playlistName = (typeof playlistDetails.data?.name !== "undefined") ? playlistDetails.data?.name : "";
    const playlistDescription = (typeof playlistDetails.data?.description !== "undefined") ? playlistDetails.data?.description : "";
    const playlistOwnerName = (typeof playlistDetails.data?.owner.name !== "undefined") ? playlistDetails.data?.owner.name : "";
    const playlistOwnerURL = (typeof playlistDetails.data?.owner.url !== "undefined") ? playlistDetails.data?.owner.url : "";
    const playlistFollowers = (typeof playlistDetails.data?.followers.total !== "undefined") ? playlistDetails.data?.followers.total : "";
    const playlistSongs = (typeof playlistDetails.data?.tracks.total !== "undefined") ? playlistDetails.data?.tracks.total : "";

    // If playlist images list is empty, append an empty url
    let playlistOwnerImages: {url: string}[] = (typeof playlistDetails.data?.owner.images !== "undefined") ? playlistDetails.data?.owner.images : [];
    if (playlistOwnerImages.length === 0) {
        playlistOwnerImages[playlistOwnerImages.length] = {url: ""};
    } */

    let playlistImage: string, playlistExternalSpotifyURL: string, playlistName: string, playlistDescription: string, playlistOwnerName: string, playlistOwnerURL: string, playlistFollowers: number, playlistSongs: number, playlistOwnerImages: {url: string}[];

    // Extract details from completePlaylistDetails
    if ((typeof completePlaylistDetails.data?.playlist !== "undefined")) {
        playlistImage = completePlaylistDetails.data.playlist.images[0].url;
        playlistExternalSpotifyURL = completePlaylistDetails.data.playlist.external_urls.spotify;
        playlistName = completePlaylistDetails.data.playlist.name;
        playlistDescription = completePlaylistDetails.data.playlist.description;
        playlistOwnerName = completePlaylistDetails.data.playlist.owner.name;
        playlistOwnerURL = completePlaylistDetails.data.playlist.owner.url;
        playlistFollowers = completePlaylistDetails.data.playlist.followers.total;
        playlistSongs = completePlaylistDetails.data.playlist.tracks.total;
        playlistOwnerImages = completePlaylistDetails.data.playlist.owner.images;
        
        // Just make sure that there is ATLEAST one url
        if (playlistOwnerImages.length === 0) {
            playlistOwnerImages = [{url: ""}];
        }

    } else {
        playlistImage = "";
        playlistExternalSpotifyURL =  "";
        playlistName = "";
        playlistDescription = "";
        playlistOwnerName = "";
        playlistOwnerURL = "";
        playlistFollowers = 0;
        playlistSongs = 0;
        playlistOwnerImages = [{url: ""}];
        
    }


    // Some styles

    const ImageStyle: React.CSSProperties = {
        maxWidth: "100%",
        width: "200px",
        height: "200px"
    };

    const LinkStyle: SxProps = {
        color: "#fff",
        textDecorationColor: "#fff",
        textDecoration: "none",
        ':hover': {
            textDecoration: "underline"
        }
    };


    return (
        <Box>
            {/* Playlist details */}
            <Grid container sx={{backgroundImage: "linear-gradient(120deg, #1D92B9, #191414)", py: 2}}>
                {/* Image */}
                <Grid item xs={12} md={4}>
                    <Box display="flex" justifyContent="center">
                        <img alt="[Playlist Image]" src={playlistImage} style={ImageStyle} />
                    </Box>
                </Grid>

                {/* Playlist details */}
                <Grid item xs={12} md={8}>
                    <Box 
                        sx={{
                            height: "100%",
                            width: "100%",
                            color: "#fff"
                        }}
                        p={2}
                    >   
                        {/* Name and description */}
                        <Link href={playlistExternalSpotifyURL} target="_blank" sx={LinkStyle}><Typography variant="h4">{playlistName}</Typography></Link>
                        <Typography color={grey["400"]}>{playlistDescription}</Typography>
                        
                        {/* Profile picture */}
                        <Box display="flex" flexDirection="row" alignItems="center" flexWrap="wrap" my={1}>
                            <Avatar 
                                sx={{backgroundColor: grey["700"], height: 28, width: 28}}
                                src={playlistOwnerImages[0].url}
                            >
                                <PersonIcon fontSize="small"/>
                            </Avatar>
                            <Typography sx={{mx: 1}}>
                                <Link href={playlistOwnerURL} target="_blank" sx={LinkStyle}>{playlistOwnerName}</Link>
                            </Typography>

                            {
                                playlistFollowers > 0 && (<>• <Typography sx={{mx: 1}}>{playlistFollowers} likes</Typography></>)
                            }
                            
                            • <Typography sx={{mx: 1}}>{playlistSongs} songs</Typography>
                        </Box>


                    </Box>
                </Grid>
            </Grid>
            
            
        </Box>
    )
}

export default DisplayPlaylistDetails;