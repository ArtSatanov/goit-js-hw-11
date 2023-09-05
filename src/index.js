import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "39273189-3f8e43104201480407e7841b8";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
   form: document.querySelector('#search-form'),
   input: document.querySelector('input[type="text"]'),
   button: document.querySelector('button[type="submit"]'),
   container: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSubmit);

async function onSubmit(event) {
   event.preventDefault();

   const formData = new FormData(event.currentTarget);
   const searchQueries = formData.get("searchQuery").split(" ").map((item) => item.trim()).filter((item) => item).join("+");
   console.log(searchQueries);

   try {
      const request = await serverRequest(searchQueries);

      refs.container.innerHTML = createMarkup(request);
   }

   catch {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
   }
}


async function serverRequest(searchQueries) {

   return axios.get('https://pixabay.com/api/', {
      params: {
         
      }
   })
   
}