import * as React from 'react';
// Mui components
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import {SxProps, useTheme} from '@mui/material/styles';

interface EstimatedTimeRemainingProps {
    value?: number;
}

function EstimatedTimeRemaining(props: EstimatedTimeRemainingProps): JSX.Element {
    /* This functional component shows a loading bar when a song is being searched */
    const {value} = props;

    // Styling
    const theme = useTheme();
    const LoaderStyle: SxProps = {
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
        },
    } 

    return (
        <Box my={1}>
            {
                value ?
                
                <LinearProgress sx={LoaderStyle} variant="determinate" value={value}/>
                :
                <LinearProgress sx={LoaderStyle} variant="indeterminate"/>
            }
        </Box>
    )
}



export default EstimatedTimeRemaining;