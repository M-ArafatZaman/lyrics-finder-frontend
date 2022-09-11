import * as React from 'react';
import {API_WEBSITE, GET_GENIUS_RESPONSE_TIME} from './endpoints';
import {_parseGetQueryToURLQuery, QueryObject} from '../../utils';
// Mui components
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses, LinearProgressProps } from '@mui/material/LinearProgress';
import {SxProps, useTheme} from '@mui/material/styles';

interface EstimatedTimeRemainingProps {
    totalSongs: number | undefined;
}


function EstimatedTimeRemaining(props: EstimatedTimeRemainingProps): JSX.Element {
    // Get props
    const { totalSongs } = props;
    // Response time from genius server
    const [geniusResponseTime, setGeniusResponseTime] = React.useState<number | null>(null);
    
    // ComponentWillMount
    React.useEffect(() => {
        // Get a response time from the genius api
        getGeniusResponseTime();

    }, [])

    

    // Function which fetches response time from server
    const getGeniusResponseTime = () => {
        const QUERY: QueryObject = {
            time: new Date().getTime().toString()
        };

        const _query = _parseGetQueryToURLQuery(QUERY);

        const _url = `${API_WEBSITE}${GET_GENIUS_RESPONSE_TIME}?${_query}`;

        fetch(_url, {mode: "cors", method: "GET"})
        .then(response => response.json())
        .then(response => {
            if (typeof response.time !== "undefined") {
                setGeniusResponseTime(parseFloat(response.time))
            }
        })
        .catch((e) => {})
    }

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
            {(typeof geniusResponseTime === "number" && typeof totalSongs === "number") ? 
                <AppLoader 
                    geniusResponseTime={geniusResponseTime}
                    totalSongs={totalSongs}
                    LinearProgressProps={{
                        sx: LoaderStyle
                    }}   
                /> :
                
                <LinearProgress sx={LoaderStyle} variant="indeterminate"/>
            }
            
        </Box>
    )
}


// This is the loader which is used on top of the MUI loader
interface AppLoaderInterface {
    geniusResponseTime: number;
    totalSongs: number;
    LinearProgressProps: LinearProgressProps;
}

function AppLoader(props: AppLoaderInterface): JSX.Element {
    const {geniusResponseTime, totalSongs, LinearProgressProps} = props;
    const [value, setValue] = React.useState<number>(0);
    // Store my interval
    const [myInterval, setMyInterval] = React.useState<NodeJS.Timeout | undefined>(undefined);   

    // Some timer constants
    const FRAMES_PER_SECOND = 1000;
    const MAX = 95;
    const MIN = 0;

    // componentWillMount
    React.useEffect(() => {
        const TOTAL_TIME_REQUIRED = geniusResponseTime * totalSongs;

        const timer: NodeJS.Timeout = setInterval(() => {
            setValue((previousValue) => {
                // Convert % value to time
                const valueToTime = (previousValue/100) * TOTAL_TIME_REQUIRED;
                const newTime = valueToTime + FRAMES_PER_SECOND;
                const normalizeNewValue = ((newTime - MIN) / (TOTAL_TIME_REQUIRED - MIN)) * MAX;
                return Math.min(normalizeNewValue, MAX);
            });
            
        }, FRAMES_PER_SECOND)

        setMyInterval(timer);

        // componentWillUnmount
        return () => {
            clearInterval(timer as NodeJS.Timeout);
        }
    }, []);

    // Attach eventlistener for "value" state update
    React.useEffect(() => {
        if (value >= MAX) {
            clearInterval(myInterval as NodeJS.Timeout);
        } 

    }, [value]);
   

    return (
        <LinearProgress 
            {...LinearProgressProps}
            variant="determinate"
            value={value}
        />
    )
}

export default EstimatedTimeRemaining;