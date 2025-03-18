import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  galleryOpen,
  showLoadButton,
  hideLoadButton,
  loadBtn,
} from './js/render-functions';

const searchForm = document.querySelector('.form');
const inputField = document.querySelector('.form-input');
let page = 1;
const perPage = 15;
let currentQuery = '';

searchForm.addEventListener('submit', async event => {
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
  currentQuery = query;
  page = 1;

  try {
    const data = await fetchImages(currentQuery, page, perPage);
    hideLoader();
    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      inputField.value = '';
      hideLoadButton();
      return;
    }
    renderGallery(data.hits);
    galleryOpen.refresh();
    inputField.value = '';
    page += 1;
    if (page <= Math.ceil(data.totalHits / perPage)) {
      showLoadButton();
    } else {
      hideLoadButton();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong! Try again later.',
      position: 'topRight',
    });
  }
});

loadBtn.addEventListener('click', async () => {
  hideLoadButton();
  showLoader();

  try {
    const data = await fetchImages(currentQuery, page, perPage);
    renderGallery(data.hits);
    galleryOpen.refresh();
    page += 1;

    const { height: cardHeight } = document
      .querySelector('.gallery-item')
      .getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (page * perPage < data.totalHits) {
      showLoadButton();
    } else {
      hideLoadButton();
      iziToast.info({
        title: 'End of results',
        message: 'You have reached the end of the collection.',
        position: 'topRight',
      });
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong! Try again later.',
      position: 'topRight',
    });
    loadBtn.style.display = 'block';
  } finally {
    hideLoader(); // Ховаємо лоадер у будь-якому разі
  }
});
