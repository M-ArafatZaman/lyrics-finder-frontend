import * as React from 'react';
import {Routes, Route} from 'react-router-dom';
import {LazyImport, FadeInWrapper} from './utils';
import {ThemeProvider} from '@mui/material/styles';
import AppTheme from './AppTheme';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Header from './layout/header';
import Footer from './layout/footer';
import Loading from './layout/loading';

//import Home from './page/Home';

// Dynamically load pages
const Home = LazyImport(() => import("./page/Home"));
const SearchPlaylist = LazyImport(() => import("./page/SearchPlaylist"));

function App(): JSX.Element {

    // Content container ref is used so that its height can be passed down to components which needs it
    const ContentContainerRef = React.useRef<HTMLDivElement | null>(null);
    const [ContentContainerHeight, setContentContainerHeight] = React.useState<number | null>(null);
    // ComponentDidMount()
    React.useEffect(() => {
        setContentContainerHeight(ContentContainerRef.current?.clientHeight as number);
    }, [ContentContainerRef])

    return (
        <ThemeProvider theme={AppTheme}>
            <Box
                display="flex"
                flexDirection="column"
                minHeight="100vh"
                width="100vw"
                maxWidth="100vw"
            >
                <Header/>

                {/* Content */}
                <Box
                    display="flex"
                    flexDirection="column"
                    flexGrow={1}
                    minHeight="100%"
                    ref={ContentContainerRef}
                >   
                    {/* Routes */}
                    <Routes>
                        <Route 
                            path="/"
                            element={
                                <React.Suspense fallback={<Loading height={ContentContainerHeight}/>} >
                                    <FadeInWrapper><Home/></FadeInWrapper>
                                </React.Suspense>}
                        />

                        <Route 
                            path="search-playlist/"
                            element={
                                <React.Suspense fallback={<Loading height={ContentContainerHeight}/>} >
                                    <FadeInWrapper><SearchPlaylist/></FadeInWrapper>
                                </React.Suspense>}
                        />
                        
                    </Routes>
                    
                </Box>

                <Footer/>
            </Box>
        </ThemeProvider>
    );
}

export default App;
