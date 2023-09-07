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
refs.input.addEventListener('change', () => {
   localStorage.removeItem('formData-state');
}
);



async function onSubmit(event) {
   event.preventDefault();

   const formData = new FormData(event.currentTarget);
   const searchQueries = formData.get("searchQuery").split(" ").map((item) => item.trim()).filter((item) => item).join("+");
   console.log(searchQueries);
   try {

      if (!searchQueries) {
         Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      } else {
      const request = await serverRequest(searchQueries);
      refs.container.innerHTML = createMarkup(request.data.hits);

      if (request.config.params.page < request.data.totalHits/40) {
      refs.loadMore.classList.remove("load-more-hidden");
         }
         }
   }
   catch {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
   }
}

async function onClick(event) {
   const pageIncrement = JSON.parse(localStorage.getItem('formData-state'));
   try {
      const request = await loadMoreImgs(pageIncrement.searchQueries, pageIncrement.page);
      if (request.config.params.page > request.data.totalHits / 40) {
         Notify.failure(`We're sorry, but you've reached the end of search results.`);
         refs.loadMore.classList.add("load-more-hidden");

      } else {
          Notify.failure(`Hooray! We found ${request.data.totalHits} images.`);
         refs.container.insertAdjacentHTML('beforeend', createMarkup(request.data.hits));
      }
   }
   catch {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.111');
   }
}
