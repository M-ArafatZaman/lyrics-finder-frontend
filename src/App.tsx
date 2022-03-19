import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Header from './layout/header';
import LinearProgress from '@mui/material/LinearProgress';

function App() {
    return (
        <Box
            display="flex"
            flexDirection="column"
        >
            <Header/>
            <LinearProgress color="error"/>
        </Box>
    );
}

export default App;
