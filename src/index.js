import Notiflix from 'notiflix';
import axios from "axios";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImg, resetPage } from './fetchImg'
import {createImgCards} from './createImgCards'

const form = document.querySelector(".search-form");
const imgContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let imgKey = '';


loadMoreBtn.classList.add('load-more__js');
form.addEventListener('submit', event => {
    event.preventDefault();
    loadMoreBtn.classList.add('load-more__js');
    clearGallery();

    imgKey = form.elements.searchQuery.value;
    if (imgKey === '') {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');

    } else {
      
   resetPage();
      fetchImg(imgKey).then(({ imgs }) => {
     imgContainer.innerHTML = createImgCards(imgs);
     createSimpleLightbox();
     loadMoreBtn.classList.remove('load-more__js');

     if (imgs.length === 0) {
              loadMoreBtn.classList.add('load-more__js');
             return Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.');

            } else if (imgs.length < 40) {
          Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
          loadMoreBtn.classList.add('load-more__js');
          
        }
      })
      .finally(); 
    }});


loadMoreBtn.addEventListener('click', () => {
    fetchImg(imgKey).then(({imgs, totalHits }) => {
        imgContainer.insertAdjacentHTML('beforeend',createImgCards(imgs));
    }
    );
});

function clearGallery() {
  imgContainer.innerHTML = '';
}

function createSimpleLightbox() {
  const gallery = new SimpleLightbox('.gallery a');
  gallery.refresh();
}

