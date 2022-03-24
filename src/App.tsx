import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Header from './layout/header';
import Footer from './layout/footer';
import Loading from './layout/loading';
import {Routes, Route} from 'react-router-dom';
import {LazyImport} from './utils';

// Dynamically load pages
const Home = LazyImport(() => import("./page/Home"));

function App(): JSX.Element {

    // Content container ref is used so that its height can be passed down to components which needs it
    const ContentContainerRef = React.useRef<HTMLDivElement | null>(null);
    const [ContentContainerHeight, setContentContainerHeight] = React.useState<number | null>(null);
    // ComponentDidMount()
    React.useEffect(() => {
        setContentContainerHeight(ContentContainerRef.current?.clientHeight as number);
    }, [ContentContainerRef])

    return (
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
                    <Route path="/" element={<React.Suspense fallback={<Loading height={ContentContainerHeight}/>} ><Home/></React.Suspense>} />
                </Routes>
                
            </Box>

            <Footer/>
        </Box>
    );
}

export default App;
