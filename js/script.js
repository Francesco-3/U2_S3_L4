const API_KEY = 'IqV1UtahmlcNSI05hG3dkaBOYC5PjpSO5vLAnhyIWBYrVQZ8S2EqRpSo';
const galleryContainer = document.querySelector('.album .container .row');
const searchInput = document.getElementById('searchInput');

const fetchImages = async (query) => {
  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
      headers: {
        Authorization: API_KEY
      }
    });

    if (!response.ok) throw new Error('Errore nella richiesta API');

    const data = await response.json();
    displayImages(data.photos);
  } catch (error) {
    console.error('Errore:', error);
  }
};

const displayImages = (photos) => {
  galleryContainer.innerHTML = '';

  photos.forEach(photo => {
    const col = document.createElement('div');
    col.className = 'col-md-4';

    col.innerHTML = `
      <div class="card mb-4 shadow-sm">
        <img src="${photo.src.medium}" class="card-img-top img-fluid object-fit-cover fixed-img-size" alt="...">

        <div class="card-body">
          <h5 class="card-title">${photo.photographer}</h5>

          <p class="card-text">${photo.alt}</p>

          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <a href="./details.html?id=${photo.id}" class="btn btn-sm btn-outline-secondary">View</a>
              <button type="button" class="btn btn-sm btn-outline-secondary hide-btn">Hide</button>
            </div>

            <small class="text-muted">${photo.id}</small>
          </div>
        </div>
      </div>
    `;

    galleryContainer.appendChild(col);
  });

  const hideButtons = document.querySelectorAll('.hide-btn');
  hideButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      card.style.display = 'none';
    });
  });
};

document.getElementById('loadImages').addEventListener('click', (e) => {
  e.preventDefault();
  fetchImages('hamsters');
});

document.getElementById('loadSecondaryImages').addEventListener('click', (e) => {
  e.preventDefault();
  fetchImages('tigers');
});

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  if (query) {
    fetchImages(query);
  }
});