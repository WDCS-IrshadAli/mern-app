import React, { useEffect, useState } from 'react'
import axios from "axios";

const useAxiosFetch = (url) => {
    //data, loading, error state handling
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);
    
    useEffect(() => {
        //define variable for to handle multiple un-neccessary request
        let isMounted = true;
        const source = axios.CancelToken.source();
        //fetch data using axios
        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {cancelToken: source.token});
                if(isMounted) {
                    setData(response.data);
                    setIsError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setData([]);
                    setIsError(err.message);
                }
            } finally {
                isMounted && setIsLoading(false);
            }
        };
        fetchData(url);
        //useEffect cleanup function
        const cleanup = () => {
            isMounted = false;
            source.cancel();
        }
        return cleanup;
    }, [url]);

  return {data, isLoading, isError};
}

export default useAxiosFetch;
