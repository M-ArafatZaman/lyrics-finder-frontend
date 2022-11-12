import React, {useState} from 'react';
// MUI components
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {onEnter} from '../../utils';

interface SearchKeywordsProps {
    searchPlaylist: <T extends React.MouseEvent | React.KeyboardEvent>(event: T) => void;
};

function SearchKeywords(props: SearchKeywordsProps): JSX.Element {
    // This functional component is used to localize the search keywords text field
    // This is done because the parent component <SearchPlaylistDetails/>
    // Stores some heavy data (completePlaylistResponse)
    // Which can be very expensive to re render
    
    // Props from parent component
    const {searchPlaylist} = props;

    return (
        <TextField
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
            id="search-keywords-TextField"
            onKeyDown={onEnter((e) => {
                // Update parent keywords
                searchPlaylist(e);
            })}
        />
    )
};

export default SearchKeywords;