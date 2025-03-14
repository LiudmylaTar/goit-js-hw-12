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
  loadBtn.style.display = 'none';
  showLoader();

  try {
    const data = await fetchImages(currentQuery, page, perPage);
    hideLoader();

    renderGallery(data.hits);
    galleryOpen.refresh();
    page += 1;

    if (page > Math.ceil(data.totalHits / perPage)) {
      hideLoadButton();
    } else {
      loadBtn.style.display = 'block';
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong! Try again later.',
      position: 'topRight',
    });
    loadBtn.style.display = 'block'; // Якщо помилка, повертаємо кнопку
  } finally {
    hideLoader(); // Ховаємо лоадер у будь-якому разі
  }
});
