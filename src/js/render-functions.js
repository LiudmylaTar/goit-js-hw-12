import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader-wrapper');

export let galleryOpen = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  close: true,
  nav: true,
  animationSlide: true,
  scrollZoom: false,
});

export function renderGallery(images) {
  const markup = images
    .map(image => {
      const limitedTags = image.tags.split(', ').slice(0, 4).join(', ');

      return `<li class="gallery-item">
      <a class="gallery-link" href="${image.largeImageURL}">
          <img 
            class="gallery-image" 
            src= "${image.webformatURL}"
            alt= "${limitedTags}"
          />
      </a>
       <div class="image-info">
          <div class="info-titles">
          <h4>Likes</h4>
          <p>${image.likes}</p>
          </div>
          <div class="info-titles">
          <h4>Views</h4>
          <p>${image.views}</p>
          </div>
          <div class="info-titles">
          <h4>Comments</h4>
          <p>${image.comments}</p>
           </div>
          <div class="info-titles">
          <h4>Downloads</h4>
          <p>${image.downloads}</p>                 
          </div>
        </div>
  </li>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  galleryOpen.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  console.log('Лоадер показано');
  loader.style.display = 'block';
}

export function hideLoader() {
  console.log('Лоадер приховано');
  loader.style.display = 'none';
}
