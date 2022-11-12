import React, {useState} from 'react';
// MUI components
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {onEnter} from '../../utils';

interface SearchKeywordsProps {
    setKeyword: React.Dispatch<React.SetStateAction<string>>;
    searchPlaylist: <T extends React.MouseEvent | React.KeyboardEvent>(event: T) => void;
};

function SearchKeywords(props: SearchKeywordsProps): JSX.Element {
    // This functional component is used to localize the search keywords text field
    // This is done because the parent component <SearchPlaylistDetails/>
    // Stores some heavy data (completePlaylistResponse)
    // Which can be very expensive to re render
    
    // Props from parent component
    const {setKeyword, searchPlaylist} = props;
 
    const [data, setData] = useState<string>("");

    return (
        <TextField
            value={data}
            placeholder="Search lyrics"
            fullWidth
            sx={{
                my: 2,
                '& .MuiOutlinedInput-root': {
                    borderRadius: 8,
                    paddingLeft: 2
                }
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position='start'><SearchIcon/></InputAdornment>
                )
            }}
            onChange={(e) => setData(e.target.value)}
            onKeyDown={onEnter((e) => {
                // Update parent keywords
                setKeyword(data);
                searchPlaylist(e);
            })}
        />
    )
};

export default SearchKeywords;