import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Header from './layout/header';
import Footer from './layout/footer';
import LinearProgress from '@mui/material/LinearProgress';

function App() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
            width="100vw"
        >
            <Header/>

            {/* Content */}
            <Box
                display="flex"
                flexDirection="column"
                flexGrow={1}
            >

            </Box>

            <Footer/>
        </Box>
    );
}

export default App;
