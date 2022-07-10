import Notiflix from 'notiflix';
import axios from "axios";
import { fetchImg, resetPage } from './fetchImg'
import {createImgCards} from './createImgCards'

const form = document.querySelector(".search-form");
const imgContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let imgKey = '';
let page = 1;
const perPage = 40;

// form.addEventListener('submit', event => {
//     event.preventDefault();
//     imgKey = form.elements.searchQuery.value;
//     if (imgKey === '') {
//         Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//     }

//     resetPage();
//     loadMoreBtn.classList.remove('is-visible');
//     fetchImg(imgKey).then(({imgs}) => {
//         imgContainer.innerHTML = createImgCards(imgs);
//         loadMoreBtn.classList.add('is-visible');
//     });
    
// });

//==================

form.addEventListener('submit', event => {
    event.preventDefault();
    clearGallery();

    imgKey = form.elements.searchQuery.value;
    if (imgKey === '') {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');

  } else {
   resetPage();
   fetchImg(imgKey).then(({imgs}) => {
            if (imgs.length === 0) {
             return Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.');

            } else if (imgs.length < 40) {
          Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
          loadMoreBtn.classList.add('is-visible');
          imgContainer.innerHTML = createImgCards(imgs);
        }
else {
          getPixabayApi.showTotalHits();
          renderPixabaiApi(hits);
          refs.loadMoreBtn.classList.remove('load-more__js');
        }
      })
      .finally(); 
    }});
//===================================







loadMoreBtn.addEventListener('click', () => {
    fetchImg(imgKey).then(({imgs, totalHits }) => {
        imgContainer.insertAdjacentHTML(
            'beforeend',
            createImgCards(imgs));

        if (imgs.length < 40) {
            loadMoreBtn.classList.remove('is-visible');
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
            
            
        }
    });
});

function clearGallery() {
  imgContainer.innerHTML = '';
}