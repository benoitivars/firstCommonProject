const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDkyZDk1Yjg3NGRlZmNlY2YxNDQ1MTM4YjdiZjk1NiIsInN1YiI6IjY1MzI4MTE1NmY4ZDk1MDBlYTU5MzJlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pymXNzJECjXs5m9U3sIp6xnvHRpr_gPnK2KZx_vvwjQ'
  }
};










const swiper1 = new Swiper('#s1', {
  loop: true,
  slidesPerView: '4',
  spaceBetween: 19,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const swiper2 = new Swiper('#s2', {
  loop: true,
  slidesPerView: '4',
  spaceBetween: 19,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const swiper3 = new Swiper('.s3', {
  loop: true,
  slidesPerView: '4',
  spaceBetween: 19,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


/*  -----------------SWIPER1------------ */

const buttonSearch = document.querySelector('#buttonSearch')
buttonSearch.addEventListener("click", function (e) {
  e.preventDefault();
  
  const searchInput = document.querySelector("#searchInput");
  const swiperWrapper1 = document.querySelector(".swiper-wrapper1");
  const searchInputValue = searchInput.value;
  const resultsWord = document.querySelector('.resultsWord');
  resultsWord.innerText = searchInputValue;
  swiperWrapper1.innerHTML = '';
  const swiper1 = document.querySelector(".swiper1")
  swiper1.style.display = "block";
  searchInputValue.innerText = "";
  fetch(`https://api.themoviedb.org/3/search/movie?query=${searchInputValue}&include_adult=false&language=en-US&page=1`, options)
      .then(response => response.json())
      .then(data => {

          data.results.forEach(result => {
              const imgSrcMovie = result.poster_path;
              if (imgSrcMovie) { /* s'assurer qu'il y a bien une image*/
                  const createDivImg = document.createElement("div");
                  createDivImg.className = "swiper-slide";
                  const createImg = document.createElement("img");
                  createImg.src = `https://image.tmdb.org/t/p/w500${imgSrcMovie}`;
                  createDivImg.appendChild(createImg);
                  swiperWrapper1.appendChild(createDivImg);

                  


              }
          });



      })
      .catch(err => {
          console.error(err);
      });
});



/*  -----------------SWIPER2 */

 fetch('https://api.themoviedb.org/3/movie/now_playing', options)

.then(response => response.json())

.then(data => {

    data.results.forEach(result => {
        const imgSrcMovie = result.poster_path;
        if (imgSrcMovie) { 
            const swiperWrapper2 = document.querySelector(".swiper-wrapper2");
            const createDivImg = document.createElement("div");
            createDivImg.className = "swiper-slide";
            const createImg = document.createElement("img");
            createImg.src = `https://image.tmdb.org/t/p/w500${imgSrcMovie}`;
            createDivImg.appendChild(createImg);
            swiperWrapper2.appendChild(createDivImg);




        }
    });



})
.catch(err => {
    console.error(err);
});


/*  -----------------SWIPER3 */


/*------------------- MODAL */
function setupModalEvents() {
  // Function to display modals
  function showModal() {
    const modalRegister = document.querySelector('#modalRegister');
    const modalGrey = document.querySelector('#modalGrey');

    modalRegister.style.display = 'flex';
    modalGrey.style.display = 'block';
  }

  // Function to hide modals
  function hideModal() {
    const modalRegister = document.querySelector('#modalRegister');
    const modalGrey = document.querySelector('#modalGrey');

    modalRegister.style.display = 'none';
    modalGrey.style.display = 'none';
  }

  // Add click event to show modals
  document.querySelector('.menu .signin').addEventListener('click', showModal);

  // Add click events to hide modals
  const closeButtons = document.querySelectorAll('.close-modal');
  for (const closeButton of closeButtons) {
    closeButton.addEventListener('click', hideModal);
  }

  // Optionally: Close modals when clicking on the grey veil (#modalGrey)
  document.querySelector('#modalGrey').addEventListener('click', hideModal);
}
