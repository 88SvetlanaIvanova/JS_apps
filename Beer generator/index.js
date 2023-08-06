window.addEventListener('DOMContentLoaded', () => {
  const beerList = document.getElementById('beer-list');
  const searchInput = document.querySelector('.search-input');
  const resetFunction = document.getElementById('reset-btn');
  //const hash = CryptoJS.SHA256(JSON.stringify(item)).toString();
  const randomBeerButton = document.getElementById('random-btn');
  const favoriteList = document.getElementById('favorite-list');
  let beers = [];
  const favoriteBeers = [];
  const beerSound = document.getElementById('beer-sound');  // Get the reference to the beer sound


  randomBeerButton.addEventListener('click', function () {
    
    generateRandomBeer();
    
  });

  searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredBeers = beers.filter(beer => beer.name.toLowerCase().includes(searchTerm));
    displayBeers(filteredBeers);
  });


  resetFunction.addEventListener('click', function () {
    searchInput.value = '';
    displayBeers(beers);
  });



  generateBeers();
  //generateRandomBeer();

  function generateRandomBeer(){
    fetch('https://api.punkapi.com/v2/beers/random')
      .then(response => response.json())
      .then(data => {
        const randomBeer = data[0]; // The API returns an array with one beer
        displayBeers([randomBeer]);
      })
      .catch(error => console.error(error));
  }

 function generateBeers(){
  fetch('https://api.punkapi.com/v2/beers')
  .then(response => response.json())
  .then(data => {
    beers = data;
    displayBeers(beers);
  })
  .catch(error => console.error(error));
 }




  function displayBeers(beers) {
    // If beers is not an array, make it an array
    if (!Array.isArray(beers)) {
      beers = [beers];
    }
    // Clear existing list
    beerList.innerHTML = '';

    // Create list items for each beer
    beers.slice(0, 12).forEach(beer => {
      // Create the beer list item and other elements
      const listItem = document.createElement('li');
      listItem.classList.add('beer-item');

      // Create a container for the beer name and buttons
      const beerInfoContainer = document.createElement('div');
      beerInfoContainer.classList.add('beer-info-container');

      // Create an image element for the beer
      const beerImage = document.createElement('img');
      beerImage.src = beer.image_url;
      beerImage.alt = beer.name;
      beerImage.classList.add('clickable-beer-image'); // Add a class to style the image if needed
      beerImage.addEventListener('click', function () { beerSound.play(); }); // Add a click event listener to the image
      listItem.appendChild(beerImage);

      const beerName = document.createElement('span');
      beerName.textContent = beer.name;
      beerName.classList.add('beer-name');
      beerInfoContainer.appendChild(beerName);

      const beerDescription = document.createElement('div');
      beerDescription.textContent = beer.description.split(' ').slice(0, 25).join(' ') + '...'; // Limit to 25 words
      beerDescription.classList.add('beer-info');
      beerInfoContainer.appendChild(beerDescription);

      // Create a favorite button next to each beer
      const favoriteButton = document.createElement('i');
      favoriteButton.classList.add('far', 'fa-star', 'favorite-btn');
      favoriteButton.addEventListener('click', (event) => {
        favoriteButton.classList.toggle('far');
        favoriteButton.classList.toggle('fas');

        if (favoriteBeers.includes(beer)) {
          removeFromFavorites(beer, favoriteButton);
        } else {
          addToFavorites(beer, favoriteButton);
        }
        updateFavoriteList();
      });
      beerInfoContainer.appendChild(favoriteButton);

      listItem.appendChild(beerInfoContainer);

      beerList.appendChild(listItem);
    });
  }


  // Add beer to favorite list
  function addToFavorites(beer, favoriteButton) {
    const hash = CryptoJS.SHA256(JSON.stringify(beer)).toString(); // Generate SHA256 hash of the beer object
  
    // Check if the hash already exists in the favoriteBeers array
    const isDuplicate = favoriteBeers.some(favoriteBeer => {
      const favoriteHash = CryptoJS.SHA256(JSON.stringify(favoriteBeer)).toString();
      return favoriteHash === hash;
    });
  
    if (!isDuplicate) {
      favoriteBeers.push(beer);
      favoriteButton.classList.remove('far');
      favoriteButton.classList.add('fas');
    }
  }
  

  // Remove beer from favorite list
  function removeFromFavorites(beer, favoriteButton) {
    const index = favoriteBeers.indexOf(beer);
    if (index > -1) {
      favoriteBeers.splice(index, 1);
      favoriteButton.classList.remove('fas');
      favoriteButton.classList.add('far');
    }
  }

  // Update the favorite beers section
  function updateFavoriteList() {
    if (!Array.isArray(favoriteBeers)) {
      favoriteBeers = [favoriteBeers];
    }
    // Clear existing list
    favoriteList.innerHTML = '';

    // Create list items for each favorite beer
    favoriteBeers.forEach(beer => {
      const favoriteListItem = document.createElement('li');
      favoriteListItem.classList.add('fav-beer-item');
      //favoriteListItem.textContent = beer.name;

      const favBeerInfoContainer = document.createElement('div');
      favBeerInfoContainer.classList.add('beer-info-container');

      const favBeerImage = document.createElement('img');
      favBeerImage.classList.add('clickable-beer-image');
      favBeerImage.src = beer.image_url;
      favBeerImage.alt = beer.name;
      favBeerInfoContainer.appendChild(favBeerImage);

      const favBeerName = document.createElement('span');
      favBeerName.textContent = beer.name;
      favBeerName.classList.add('beer-name');
      favBeerInfoContainer.appendChild(favBeerName);

      favoriteListItem.appendChild(favBeerInfoContainer);
      favoriteList.appendChild(favoriteListItem);

    });
  }
})
