const DEFAULT_PAGE = 1;
let page = DEFAULT_PAGE;
let totalHitsImage = '';

export const resetPage = () => {
    page = DEFAULT_PAGE;
};

export const fetchImg = (imgKey) => {
    const searchParams = new URLSearchParams({
        key: '28537959-b0bbf2c2513809284b91fef7c',
        image_type: 'photo',
        orientation: "horizontal",
        safesearch: true,
        page,
        per_page: 40,
        q: imgKey,
    });

    return fetch(
        `https://pixabay.com/api/?${searchParams}`
    ).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
        .then(data => {
            page += 1;
            return {
                imgs: data.hits,
            };
        });
    
};