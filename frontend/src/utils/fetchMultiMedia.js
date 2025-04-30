import axios from 'axios'
import baseUrl from './baseUrl'

// Fetch multiple media based on type, trending, movie, tv 
const fetchMultiMedia = async (page, mediaType) => {
    const { data } = await axios.get(`${baseUrl}/media/${mediaType}/${page}`);
    console.log("FETCH MULTIMEDIA API",data);
    if (data.status_code) {
        return { error: data.status_message };
    }
    if (data.results.length === 0) {
        return { error: 'No results found' };
    }
    return data.data;
};


export default fetchMultiMedia;

