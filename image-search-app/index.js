const accessKey ="g7IIIgqh5Vdg4Ifxzye0EPE8obo0LUHt0O2PDn9y-Ts";
//

const formElement = document.querySelector("form");
const searchInputElement = document.getElementById("search-input");
const searchResultsElement = document.querySelector(".search-results");
const showMoreButtonElement = document.getElementById("show-more-button");

let inputData = "";
let page = 1;
async function searchImages(){
  inputData = searchInputElement.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
    if(page === 1){
      searchResultsElement.innerHTML = "";
    }

  const results = data.results;  
results.map((result)=> {
  const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html
    image.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsElement.appendChild(imageWrapper);
  
});
    page++;

    if(page > 1){
      showMoreButtonElement.style.display = "block";
    }
  console.log(results);
};


formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages(); 
});

showMoreButtonElement.addEventListener('click',()=>{
  searchImages();
});

