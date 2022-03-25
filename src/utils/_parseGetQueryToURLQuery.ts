/**
 * This function converts a query object to a get url string
 */

export interface QueryObject {
    [key: string]: string;
}

function _parseGetQueryToURLQuery(T: QueryObject): string {

    let _query: string[] = [];

    for (let x in T) {
        // Append
        _query[_query.length] = encodeURIComponent(x) + "=" + encodeURIComponent(T[x]);
    }

    return _query.join("&");
}

export default _parseGetQueryToURLQuery;