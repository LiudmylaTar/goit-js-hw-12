import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  galleryOpen,
} from './js/render-functions';

const searchForm = document.querySelector('.form');
const searchBtn = document.querySelector('.search-btn');
const inputField = document.querySelector('.form-input');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const query = inputField.value.trim();

  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }
  clearGallery();
  showLoader();

  fetchImages(query)
    .then(images => {
      hideLoader();

      if (images.length === 0) {
        iziToast.warning({
          title: 'No results',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        inputField.value = '';
        return;
      }
      renderGallery(images);
      galleryOpen.refresh();
      inputField.value = '';
    })
    .catch(error => {
      hideLoader();
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong! Try again later.',
        position: 'topRight',
      });
    });
});
