
const formEl = document.querySelector('form');
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = inputEl.value;
    const url = `https://dummyjson.com/products/search?q=${inputData}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        const results = data.products; 
        if (page === 1) {
            searchResults.innerHTML = "";
        }
        results.map((result) => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('search-result');
            const image = document.createElement('img');
            image.src = result.thumbnail;
            image.alt = result.title;
            const productTitle = document.createElement("h3");
            productTitle.innerText = result.title;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(productTitle);
            searchResults.appendChild(imageWrapper);
        });
        page++;
        if (results.length > 0) {
            showMore.style.display = "block";
        } else {
            showMore.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching the images:", error);
    }
}

async function fetchProducts(){
    const url = 'https://dummyjson.com/products';

    try {
        const response = await fetch(url);
        const data = await response.json();

        const results = data.products; 
        results.map((result) => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('search-result');
            const image = document.createElement('img');
            image.src = result.thumbnail;
            image.alt = result.title;
            const productTitle = document.createElement("h3");
            productTitle.innerText = result.title;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(productTitle);
            searchResults.appendChild(imageWrapper);
        });
    } catch (error) {
        console.error("Error fetching the images:", error);
    }
}

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener('click', (e) => {
    searchImages();
});

inputEl.addEventListener('keyup', (e) => {
    if(e.target.value === ""){
        window.location.reload();
    }
});

document.addEventListener('DOMContentLoaded', function() {
   fetchProducts();
});
