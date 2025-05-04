import axios from 'axios'
import baseUrl from './baseUrl'

const fetchMultiMedia = async (page, mediaType) => {
    const { data } = await axios.get(`${baseUrl}/media/${mediaType}/${page}`);
    console.log("FETCH MULTIMEDIA API", data);
    
    if (data.status_code) {
      throw new Error(data.status_message); // throw instead of return
    }
    if (!data.data || data.data.length === 0) {
      throw new Error("No results found");  // throw instead of return
    }
  
    return data.data; // always return an array
  };


export default fetchMultiMedia;
