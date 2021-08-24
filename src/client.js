import React from 'react';
import ReactDOM from 'react-dom';
import useFetch from 'react-fetch-hook';


function App() {
    const {isLoading, data} = useFetch('http://localhost:4001');
    if(isLoading) {
        return 'Loading...';
    }
    return <pre>{JSON.stringify(data, null, 4)}</pre>;
}


ReactDOM.render(<App />, document.getElementById('app'));
