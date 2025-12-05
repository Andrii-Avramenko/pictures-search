const searchBar = document.querySelector(".search-bar");
const resultsEl = document.querySelector(".results");
const submitBtn = document.querySelector(".submit-button");

window.addEventListener('load', () => {
    document.querySelector('.api-key-input').value = localStorage.getItem('apiKey') ? localStorage.getItem('apiKey') : 'B'
    console.log(document.querySelector('.api-key-input').value) 
})

function searchPictures(e) {
  e.preventDefault()
  const api = document.querySelector('.api-key-input').value.trim();
  let searchValue = searchBar.value.trim().replace(/ +/g, "+");
  console.log('https://pixabay.com/api/?key=' + api + '&q=' + searchValue)
  fetch('https://pixabay.com/api/?key=' + api + '&q=' + searchValue)
    .then((response) => response.json())
    .then((data) => {
      renderPictures(data)
      localStorage.setItem('apiKey', api)
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
function renderPictures(response) {
    console.log(response.hits)
    response.hits.forEach(picture => {
        const element = document.createElement('li')
        element.classList.add('result')
        element.innerHTML = `<a href="${picture.pageURL}" target="_blank"><img src="${picture.webformatURL}" alt="Tags: ${picture.tags}" class="image"></a>`
        resultsEl.appendChild(element) 
    });
}

submitBtn.addEventListener("click", searchPictures);
