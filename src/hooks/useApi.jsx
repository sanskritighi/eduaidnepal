import {useState,useEffect} from 'react'
import axios from '../api/axios'
import { useAuth } from './useAuth';


const useGET = (url,headers={},useToken=false) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const {user}=useAuth()


  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);

    if(useToken){
      headers={
        ...headers,
        'Authorization':`Bearer ${user.token.access}`
      }
    }

    try {
      const response = await axios.get(url,{
        headers:headers
      });
      setData(response.data);
    } catch (error) {
      setIsError(true);
      setError(error);
      
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, isError, error, refetch };
};




// const usePOST = (url) => {
//     const [data, setData] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isError, setIsError] = useState(false);
//     const [error, setError] = useState(null);
  
//     const postData = async (postData) => {
//       setIsLoading(true);
//       setIsError(false);
  
//       try {
//         const response = await axios.post(url, postData);
//         setData(response.data);
//       } catch (error) {
//         setIsError(true);
//         setError(error);
//       }
  
//       setIsLoading(false);
//     };
  
//     return { data, isLoading, isError, error, postData };
//   };


  // const usePATCH = (url) => {
  //   const [data, setData] = useState(null);
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [isError, setIsError] = useState(false);
  //   const [error, setError] = useState(null);
  
  //   const putData = async (updateData) => {
  //     setIsLoading(true);
  //     setIsError(false);
  
  //     try {
  //       const response = await axios.patch(url, updateData);
  //       setData(response.data);
  //     } catch (error) {
  //       setIsError(true);
  //       setError(error);
  //     }
  
  //     setIsLoading(false);
  //   };
  
  //   return { data, isLoading, isError, error, putData };
  // };
  

export {useGET}