import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const MY_API_KEY = '49208240-98906b06c81b1fd858a2b8a19';

export function fetchImages(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: MY_API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => {
      if (response.data.hits.length === 0) {
        return [];
      }
      return response.data.hits;
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      throw error;
    });
}
