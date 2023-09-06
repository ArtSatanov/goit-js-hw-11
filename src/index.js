import { createMarkup } from './interface-part';
import { serverRequest, loadMoreImgs } from './api-part';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
   form: document.querySelector('#search-form'),
   input: document.querySelector('input[type="text"]'),
   button: document.querySelector('button[type="submit"]'),
   container: document.querySelector('.gallery'),
   loadMore: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSubmit);
refs.loadMore.addEventListener('click', onClick);

refs.input.addEventListener('change', () => localStorage.removeItem('formData-state'));



async function onSubmit(event) {
   event.preventDefault();

   const formData = new FormData(event.currentTarget);
   const searchQueries = formData.get("searchQuery").split(" ").map((item) => item.trim()).filter((item) => item).join("+");
   try {
      const request = await serverRequest(searchQueries);
      console.log(request.data.hits);
      console.log(request.config.params.page);
      refs.container.innerHTML = createMarkup(request.data.hits);
   }
   catch {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.1');
   }
}

async function onClick(event) {
   const pageIncrement = JSON.parse(localStorage.getItem('formData-state'));
   console.log(pageIncrement);
   try {
      const request = await loadMoreImgs(pageIncrement.searchQueries,pageIncrement.page);
      console.log(request);
      console.log(request.config.params.page);
      refs.container.insertAdjacentHTML('beforeend',createMarkup(request.data.hits)) ;
   }
   catch {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.1');
   }
}
