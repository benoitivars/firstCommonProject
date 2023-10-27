document.addEventListener('DOMContentLoaded', (event) => {
  // Swiper initializations
  var swiper1 = new Swiper('#s1', {
      slidesPerView: 4,
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
  });

  var swiper2 = new Swiper('#s2', {
      slidesPerView: 4,
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
  });

  var swiper3 = new Swiper('#s3', {
      slidesPerView: 4,
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
  });

// Fonction pour afficher les modaux
function showModal() {
  const modalRegister = document.querySelector('#modalRegister');
  const modalGrey = document.querySelector('#modalGrey');

  modalRegister.style.display = 'flex';
  modalGrey.style.display = 'block';
}

// Fonction pour masquer les modaux
function hideModal() {
  const modalRegister = document.querySelector('#modalRegister');
  const modalGrey = document.querySelector('#modalGrey');

  modalRegister.style.display = 'none';
  modalGrey.style.display = 'none';
}

// Ajout de l'événement click pour afficher les modaux
document.querySelector('.menu .signin').addEventListener('click', showModal);

// Ajout des événements click pour masquer les modaux
const closeButtons = document.querySelectorAll('.close-modal');
for (const closeButton of closeButtons) {
  closeButton.addEventListener('click', hideModal);
}

// Optionnel : Fermer les modaux lorsque l'on clique sur le voile gris (#modalGrey)
document.querySelector('#modalGrey').addEventListener('click', hideModal);

  // Appel API 
  const options = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization:'Bearer [YourToken]'
      }
  };

  fetch(`https://api.themoviedb.org/3/search/movie?query=godfather&include_adult=false&language=en-US&page=1&append_to_response=credits`, options)
      .then(response => response.json())
      .then(data => {
          const movieResults = data.results.map(movie => {
              return {
                  title: movie.title,
                  releaseYear: movie.release_date.slice(0, 4),
                  overview: movie.overview,
                  voteAverage: movie.vote_average.toFixed(1),
                  posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                  topActors: movie.credits.cast.slice(0, 10).map(actor => actor.name)
              };
          });
          console.log(movieResults);
      })
      .catch(err => console.error(err));
});