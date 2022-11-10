import React from 'react';
import replaceStringWithContent, {ReplacedContentOutputType} from '../../utils/reactStringReplace';
// MUI
import Typography from '@mui/material/Typography';

interface SnippetContentProps {
    keyword: string;
    snippet: string;
}


// The snippet content prop
function SnippetContent(props: SnippetContentProps): JSX.Element {
    /* This functional component renders each snippet LINE in the SearchResults -> ListContent component */
    const {keyword, snippet} = props;

    // Replace \n with lines, and replace the keyword in each string line with a span tag
    let _lines = replaceStringWithContent(snippet, "\n", () => <br/>);
    let _FinalSnippet: ReplacedContentOutputType[] = [];

    // Iterate through each lines
    for (let i in _lines) {
        // Only replace for keyword if the current element is a string
        if (typeof _lines[i] === "string") {
            // Replace 
            const ReplacedContent = replaceStringWithContent(_lines[i] as string, new RegExp(keyword, "gi"), (match) => <span style={{textDecoration: "underline"}}>{match}</span>);
            // Add on to final snippet
            _FinalSnippet = _FinalSnippet.concat( ReplacedContent );
        } else {
            _FinalSnippet[_FinalSnippet.length] = _lines[i]
        }
    }

    return (
        <Typography color="textSecondary" sx={{fontStyle: "italic"}} fontSize={14}>
            "{_FinalSnippet.map((each, i) => <React.Fragment key={i}>{each}</React.Fragment>)}"
        </Typography>
    )

};

export default SnippetContent;