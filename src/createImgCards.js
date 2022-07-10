export const createImgCards = imgs => {
    return imgs
    .map(
    ({webformatURL, tags,  likes, views, comments, downloads}) => 
        `<div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300" height="200" />
            <div class="info">
                <p class="info-item">
                <b>Likes <span> ${likes}</span></b>
                </p>
                <p class="info-item">
                <b>Views <span> ${views}</span></b>
                </p>
                <p class="info-item">
                <b>Comments <span>${comments}</span></b>
                </p>
                <p class="info-item">
                <b>Downloads<span> ${downloads}</span></b>
                </p>
            </div>
        </div>
    `).join('');
}
