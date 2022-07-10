import Notiflix from 'notiflix';
import axios from "axios";
import { fetchImg, resetPage } from './fetchImg'
import {createImgCards} from './createImgCards'

const form = document.querySelector(".search-form");
const imgContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let imgKey = '';

form.addEventListener('submit', event => {
    event.preventDefault();
    imgKey = form.elements.searchQuery.value;
    if (imgKey === '') {
        Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    }

    

    resetPage();
    loadMoreBtn.classList.remove('is-visible');
    fetchImg(imgKey).then(({imgs}) => {
        imgContainer.innerHTML = createImgCards(imgs);
        loadMoreBtn.classList.add('is-visible');
    });
    return alert("Hooray! We found totalHits images.");
});

loadMoreBtn.addEventListener('click', () => {
    fetchImg(imgKey).then(({imgs, isLastPage }) => {
        imgContainer.insertAdjacentHTML(
            'beforeend',
            createImgCards(imgs));
        
        if (isLastPage) {
            loadMoreBtn.classList.remove('is-visible');
            alert("We're sorry, but you've reached the end of search results.");
        }
    });
});
