import { serverRequest } from './api-part';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


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

export {onSubmit};