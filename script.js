let placesService;
let currentUserLocation;
function initMap() {
  placesService = new google.maps.places.PlacesService(document.createElement('div'));
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        currentUserLocation = userLocation;
        console.log(currentUserLocation)
        // searchPlaces(currentUserLocation);
      },
      error => {
        alert('Error getting user location: ' + error.message);
      }
    );
  } else {
    alert('Geolocation is not supported by your browser.');
  }
}

function searchPlaces(currentUserLocation) {
  const placeInput = document.getElementById('place-input').value;
  const radiusInput = document.getElementById('radius-input').value;

  if (!placeInput || !radiusInput) {
    alert('Please enter both a place and a search radius.');
    return;
  }

  const request = {
    query: placeInput,
  };

  if (currentUserLocation) {
    request.location = currentUserLocation;
    request.radius = parseInt(radiusInput);
  }
  
  placesService.textSearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      displayResults(results);
    } else {
      alert('Error in text search: ' + status);
    }
  });
}

function displayResults(results) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  results.forEach(place => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');

    const nameElement = document.createElement('h3');
    nameElement.textContent = place.name;

    const addressElement = document.createElement('p');
    addressElement.textContent = place.formatted_address;

    resultItem.appendChild(nameElement);
    resultItem.appendChild(addressElement);

    resultsContainer.appendChild(resultItem);
  });
}

getUserLocation();