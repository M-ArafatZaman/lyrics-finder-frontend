/* 
This function replaces a string with either a string or a react component and returns an array
*/

type ReplacedContentOutput = string | JSX.Element;

function replaceStringWithContent(str: string, regex: string | RegExp, fn: (match?: string) => string | JSX.Element): ReplacedContentOutput[] {

    // Convert RegExp into a RegExp if its not a RegExp
    if (!(regex instanceof RegExp)) {
        regex = new RegExp(regex, "g");
    }

    // Split the arr at each regex and find matches
    let splittedArr = str.split(regex);
    let matchedContent = str.match(regex);
    let insertedArr: ReplacedContentOutput[] = [];
    let insertedMatchIndex = 0;
    // Insert elements from the splittedArr into the insertedArr
    for (let i = 0; i < splittedArr.length; i++) {
        // If index isnt first or last
        if ((i !== 0) && (i < splittedArr.length) && (matchedContent !== null)) {
            // If a match exists
            if (insertedMatchIndex in matchedContent) {
                insertedArr[insertedArr.length] = fn(matchedContent[insertedMatchIndex]);
            }
            // Increment only if the next var is in matchedContent
            if ((insertedMatchIndex + 1) in matchedContent) {
                insertedMatchIndex++;
            }
        }
        // Append current index regardless
        insertedArr[insertedArr.length] = splittedArr[i];
    }

    return insertedArr;
}


export type {ReplacedContentOutput as ReplacedContentOutputType};
export default replaceStringWithContent;