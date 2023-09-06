import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
   form: document.querySelector('#search-form'),
   input: document.querySelector('input[type="text"]'),
   button: document.querySelector('button[type="submit"]'),
   container: document.querySelector('.gallery'),
};

const defaults = {
  poster: "https://www.reelviews.net/resources/img/default_poster.jpg",
  date: "XXXX-XX-XX",
  title: "Title not found",
  vote: "XX.XX",
};

let page = 1;

refs.form.addEventListener('submit', onSubmit);

async function onSubmit(event) {
   event.preventDefault();

   const formData = new FormData(event.currentTarget);
   const searchQueries = formData.get("searchQuery").split(" ").map((item) => item.trim()).filter((item) => item).join("+");
   console.log(searchQueries);

   try {
      const request = await serverRequest(searchQueries);
      console.log(request.data.hits);
      refs.container.innerHTML = createMarkup(request.data.hits);
   }

   catch {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.!!!!!!');
   }
}


async function serverRequest(searchQueries) {
  
      const  response = await axios.get('https://pixabay.com/api/', {
         params: {
         key: '39273189-3f8e43104201480407e7841b8',
            q: searchQueries,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'safesearch',
            per_page: '40',
            page: page,
         }
      })
   try {
      console.log(response);
      return response;

   } catch (err) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
   }
   
}

function createMarkup(arr) {
   return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
      `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`).join("");
}