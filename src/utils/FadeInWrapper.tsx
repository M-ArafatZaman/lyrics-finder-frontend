import React from 'react';
import {css, keyframes} from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// Keyframes and css
const FadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;


interface FadeInWrapperProps {
    children: JSX.Element | React.ComponentType<any>
}

function FadeInWrapper(props: FadeInWrapperProps): JSX.Element {

    return (
        <Box 
            sx={(theme) => ({
                animation: `${FadeIn} 1000ms ${theme.transitions.easing.easeInOut}`
            })}
        >
            {props.children}
        </Box>
    )
}

export default FadeInWrapper;