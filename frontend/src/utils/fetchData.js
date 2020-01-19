const defaultErrorCallback = (err) => {};

const fetchData = (method, url, successCallback, errorCallback=defaultErrorCallback, headers={}, body="") => {
    fetch(`http://localhost:3001/${url}`, method === 'GET' ? {headers} : {
            method,
            headers,
            body
        })
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            if(json.err) throw new Error(json.err);
            successCallback(json);
        })
        .catch((err) => {
            console.error(err);
            errorCallback(err);
        });
}

export default fetchData;