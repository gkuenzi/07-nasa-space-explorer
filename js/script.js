// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const placeholder = document.getElementsByClassName('placeholder');
const getImageBtn = document.getElementById('imageBtn');


const API_KEY = 'VDiBb7KwgXbIF1WZBQUvNgkBBXhfXLY3ob6Y2WEF';  // Replace with your own key

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)

async function fetchAPOD() {
  placeholder.innerHTML = '🔄Loading space photos…';
  try {
    // Build the API URL each time to get the latest dates from the inputs
    const apiUrl = `https://api.nasa.gov/planetary/apod?start_date=${startInput.value}&end_date=${endInput.value}&api_key=${API_KEY}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('data', data);

    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ""; // Clear previous images

    // If data is not an array, make it an array with one item
    const apodArray = Array.isArray(data) ? data : [data];
    // Loop through each item and create a card if it's an image
    apodArray.forEach(item => {
      if (item.media_type === 'image') {
        // Create a new div for each image card
        const card = document.createElement('div');
        // Use the same class as in your CSS for gallery items
        card.className = 'gallery-item';
        // Add some space below each card using inline style
        card.style.marginBottom = '48px';

        // Set the inner HTML of the card
        card.innerHTML = `
          <img src="${item.url}" alt="${item.title}">
          <h3>${item.title}</h3>
          <p><strong>${item.date}</strong></p>
          <p>${item.explanation}</p>
        `;

        // Add the card to the gallery
        gallery.appendChild(card);
      }
    });
  } catch (error) {
    console.error('Error fetching APOD data:', error);
  }
}

setupDateInputs(startInput, endInput);
console.log("date", startDate);

getImageBtn.addEventListener('click', function() {
  fetchAPOD();
})
