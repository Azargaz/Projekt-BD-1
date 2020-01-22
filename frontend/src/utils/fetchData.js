const defaultErrorCallback = (err) => {};

const apiURL = "http://localhost:3001/";
// const apiURL = "http://pascal.fis.agh.edu.pl:3001/";

const fetchData = (method, url, successCallback, errorCallback=defaultErrorCallback, headers={}, body="") => {
    fetch(apiURL + url, method === 'GET' ? {headers} : {
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