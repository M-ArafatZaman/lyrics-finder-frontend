import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {Player} from '@lottiefiles/react-lottie-player';
import AudioSpectrumLottie from '../lotties/AudioSpectrumLottie.json';

interface LoadingProps {
    height?: number | null
}

function Loading(props: LoadingProps): JSX.Element {

    return (
        <>
            <LinearProgress color="primary"/>
            <Box 
                minHeight={props.height ? `${props.height}px` : "100%"}
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box>
                    <Player
                        autoplay
                        loop
                        src={AudioSpectrumLottie}
                        style={{height: "100px", width: "100px"}}
                    />
                </Box>
            </Box>
        </>
    )
}

export default Loading;