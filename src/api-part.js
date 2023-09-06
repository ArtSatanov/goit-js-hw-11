import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let currentPage = 1;
async function serverRequest(searchQueries) {
  
      const  response = await axios.get('https://pixabay.com/api/', {
         params: {
         key: '39273189-3f8e43104201480407e7841b8',
            q: searchQueries,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'safesearch',
            per_page: '40',
            page: currentPage,
         }
      })
   try {
      localStorage.setItem(searchQueries, currentPage);
      console.log(response)
      return response;

   } catch (err) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
   }
}

// async function loadMoreImgs (currentPage,searchQueries) {

// } 




export {serverRequest};