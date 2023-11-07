const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDkyZDk1Yjg3NGRlZmNlY2YxNDQ1MTM4YjdiZjk1NiIsInN1YiI6IjY1MzI4MTE1NmY4ZDk1MDBlYTU5MzJlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pymXNzJECjXs5m9U3sIp6xnvHRpr_gPnK2KZx_vvwjQ'
  }
};





const swiper2 = new Swiper('#s2', {
  loop: true,
  slidesPerView: '4',
  spaceBetween: 19,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});



/* ---------------const et fonction modal movie----- */

const titleCard = document.querySelector(".titleCard");
const yearCard = document.querySelector(".yearCard");
const rateCard = document.querySelector(".rateCard");
const genreCard = document.querySelector(".genreCard");
const resumeCard = document.querySelector(".resumeCard");
const castCard = document.querySelector(".castCard");
const modalMovies = document.querySelector(".modalMovies");
const imgMovieModal = document.querySelector(".imgMovieModal");


function displayMovieInfo(result, imgSrcMovie) {
  modalMovies.showModal();

  /* initialiser le Card */
  titleCard.innerText = "";
  yearCard.innerText = "";
  rateCard.innerText = "";
  resumeCard.innerText = "";
  genreCard.innerText = "";
  castCard.innerText = "";

  imgMovieModal.src = `https://image.tmdb.org/t/p/w500${imgSrcMovie}`;
  titleCard.innerText = result.title;
  yearCard.innerText = result.release_date.substring(0, 4);
  rateCard.innerText = result.vote_average.toFixed(1);
  resumeCard.innerText = result.overview;


  fetch(`https://api.themoviedb.org/3/movie/${result.id}?language=en-US&append_to_response=credits`, options)
    .then(response => response.json())
    .then(movieData => {
      const genreNames = movieData.genres.map(genre => genre.name);
      genreCard.innerText = genreNames.join(', ');

      /* acteurs principaux (les 5 premiers) */
      const topActors = movieData.credits.cast.slice(0, 5); 
      const actorsText = topActors.map(actor => actor.name).join(', ');
      castCard.innerText = actorsText;
    })
    .catch(err => {
      console.error(err);
    });
}



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
      const swiper1 = new Swiper('#s1', {
        loop: true,
        slidesPerView: '4',
        spaceBetween: 19,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
      data.results.forEach(result => {
        const imgSrcMovie = result.poster_path;
        if (imgSrcMovie) { /* s'assurer qu'il y a bien une image*/
          const createDivImg = document.createElement("div");
          createDivImg.className = "swiper-slide";
          const createImg = document.createElement("img");
          createImg.src = `https://image.tmdb.org/t/p/w500${imgSrcMovie}`;
          createDivImg.appendChild(createImg);
          swiperWrapper1.appendChild(createDivImg);

          createDivImg.addEventListener('click', () => {
          

            displayMovieInfo(result, imgSrcMovie);

          });
        }
      });



    })
    .catch(err => {
      console.error(err);
    });
});



/*  -----------------SWIPER2 ---------------------*/


/* image et modal  */
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

        
        /* HOVER */


        const createDiv = document.createElement("div");

        
        createDivImg.addEventListener('mouseover', () => {
          
          createDiv.innerHTML ="";

          const createPTitle = document.createElement("p");
          createPTitle.innerText = result.title;
          createPTitle.className="titleHover";
          createDiv.appendChild(createPTitle);

          const createPYear = document.createElement("p");
          createPYear.innerText = result.release_date.substring(0, 4);
          createPYear.className="yearHover";
          createDiv.appendChild(createPYear);
          


          const createPGenre = document.createElement("p");
          createDiv.appendChild(createPGenre);
          fetch(`https://api.themoviedb.org/3/movie/${result.id}?language=en-US&append_to_response=credits`, options)
          
          .then(response => response.json())
          .then(movieData => {
            if (createDiv.querySelector(".genreHover")) {
              // Vérifier si l'élément de genre existe déjà
              return;
            }
            
            const genreNames = movieData.genres.map(genre => genre.name); /* creer un tableau et prendre l'element name  */
            createPGenre.innerText = genreNames.join(', ');
            createPGenre.className = "genreHover";
            
            
          })
          .catch(err => {
            console.error(err);
          });   

        const createImgHover = document.createElement("img");
        createImgHover.src = "images/StarRed.svg";
        createImgHover.style.width="35px";
        createImgHover.style.height="35px";
        createDiv.appendChild(createImgHover);

        const createPRate = document.createElement("p");
        createPRate.innerText = result.vote_average.toFixed(1);
        createPRate.className="rateHover";
        createDiv.appendChild(createPRate);
          
        createDivImg.appendChild(createDiv);
          createDiv.className = "movieHover";
          createDiv.style.display = "block";
        });

        createDivImg.addEventListener('mouseout', () => {
          createDiv.style.display = "none";
        });

        createDiv.addEventListener('click', () => {
          displayMovieInfo(result, imgSrcMovie);
        });
        
      }
    });
  })
  .catch(err => {
    console.error(err);
  });



/*-----------------SWIPER3------------------------------*/
const comedy = document.querySelector(".comedy");
const drama = document.querySelector(".drama");
const action = document.querySelector(".action");
const romance = document.querySelector(".romance");
const fantasy = document.querySelector(".fantasy");
const animation = document.querySelector(".animation");
const swiperWrapper3 = document.querySelector(".swiper-wrapper3");
const adaptative2 = document.querySelector("#adaptative2");

const swiper3 = new Swiper('.s3', {
  loop: true,
  slidesPerView: '4',
  spaceBetween: 19,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});



/* fetch comedy */

fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35', options)

  .then(response => response.json())
  .then(data => {


    data.results.forEach(result => {
      const imgSrcMovie = result.poster_path;
      if (imgSrcMovie) { /* s'assurer qu'il y a bien une image*/
        const swiperWrapper3 = document.querySelector(".swiper-wrapper3");
        const createDivImg = document.createElement("div");
        createDivImg.className = "swiper-slide";
        const createImg = document.createElement("img");
        createImg.src = `https://image.tmdb.org/t/p/w500${imgSrcMovie}`;
        createDivImg.appendChild(createImg);
        swiperWrapper3.appendChild(createDivImg);

        createDivImg.addEventListener('click', () => {
          displayMovieInfo(result, imgSrcMovie);
        });

      }
    });



  })
  .catch(err => {
    console.error(err);
  });

comedy.addEventListener("click", () => {
  swiperWrapper3.innerHTML = "";
  adaptative2.innerText = "Comedy";

  fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35', options)
    .then(response => response.json())
    .then(data => {

      const swiper3 = new Swiper('.s3', {
        loop: true,
        slidesPerView: '4',
        spaceBetween: 19,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
      data.results.forEach(result => {
        const imgSrcMovie = result.poster_path;
        if (imgSrcMovie) { /* s'assurer qu'il y a bien une image*/
          const swiperWrapper3 = document.querySelector(".swiper-wrapper3");
          const createDivImg = document.createElement("div");
          createDivImg.className = "swiper-slide";
          const createImg = document.createElement("img");
          createImg.src = `https://image.tmdb.org/t/p/w500${imgSrcMovie}`;
          createDivImg.appendChild(createImg);
          swiperWrapper3.appendChild(createDivImg);

          createDivImg.addEventListener('click', () => {
            displayMovieInfo(result, imgSrcMovie);
          });
        }
      });



    })
    .catch(err => {
      console.error(err);
    });

});


/* fetch drama */


drama.addEventListener("click", () => {

  swiperWrapper3.innerHTML = "";
  adaptative2.innerText = "Drama";


  fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18', options)

    .then(response => response.json())

    .then(data => {
      const swiper3 = new Swiper('.s3', {
        loop: true,
        slidesPerView: '4',
        spaceBetween: 19,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });

      data.results.forEach(result => {
        const imgSrcMovie = result.poster_path;
        if (imgSrcMovie) { /* s'assurer qu'il y a bien une image*/
          const swiperWrapper3 = document.querySelector(".swiper-wrapper3");
          const createDivImg = document.createElement("div");
          createDivImg.className = "swiper-slide";
          const createImg = document.createElement("img");
          createImg.src = `https://image.tmdb.org/t/p/w500${imgSrcMovie}`;
          createDivImg.appendChild(createImg);
          swiperWrapper3.appendChild(createDivImg);

          createDivImg.addEventListener('click', () => {
            displayMovieInfo(result, imgSrcMovie);
          });
        }

      });

    })
    .catch(err => {
      console.error(err);
    });

});

/* fetch action */

action.addEventListener("click", () => {
  swiperWrapper3.innerHTML = "";
  adaptative2.innerText = "Action";

  fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28', options)
    .then(response => response.json())
    .then(data => {
      const swiper3 = new Swiper('.s3', {
        loop: true,
        slidesPerView: '4',
        spaceBetween: 19,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });

      data.results.forEach(result => {
        const imgSrcMovie = result.poster_path;
        if (imgSrcMovie) { /* s'assurer qu'il y a bien une image*/
          const swiperWrapper3 = document.querySelector(".swiper-wrapper3");
          const createDivImg = document.createElement("div");
          createDivImg.className = "swiper-slide";
          const createImg = document.createElement("img");
          createImg.src = `https://image.tmdb.org/t/p/w500${imgSrcMovie}`;
          createDivImg.appendChild(createImg);
          swiperWrapper3.appendChild(createDivImg);

          createDivImg.addEventListener('click', () => {
            displayMovieInfo(result, imgSrcMovie);
          });
        }
      });



    })
    .catch(err => {
      console.error(err);
    });

});
/* fetch romance */

romance.addEventListener("click", () => {
  swiperWrapper3.innerHTML = "";
  adaptative2.innerText = "Romance";

  fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10749', options)
    .then(response => response.json())
    .then(data => {
      const swiper3 = new Swiper('.s3', {
        loop: true,
        slidesPerView: '4',
        spaceBetween: 19,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });

      data.results.forEach(result => {
        const imgSrcMovie = result.poster_path;
        if (imgSrcMovie) { /* s'assurer qu'il y a bien une image*/
          const swiperWrapper3 = document.querySelector(".swiper-wrapper3");
          const createDivImg = document.createElement("div");
          createDivImg.className = "swiper-slide";
          const createImg = document.createElement("img");
          createImg.src = `https://image.tmdb.org/t/p/w500${imgSrcMovie}`;
          createDivImg.appendChild(createImg);
          swiperWrapper3.appendChild(createDivImg);

          createDivImg.addEventListener('click', () => {
            displayMovieInfo(result, imgSrcMovie);
          });
        }
      });



    })
    .catch(err => {
      console.error(err);
    });

});
/* fetch fantasy */

fantasy.addEventListener("click", () => {
  swiperWrapper3.innerHTML = "";
  adaptative2.innerText = "Fantasy";

  fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=14', options)
    .then(response => response.json())
    .then(data => {

      const swiper3 = new Swiper('.s3', {
        loop: true,
        slidesPerView: '4',
        spaceBetween: 19,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
      data.results.forEach(result => {
        const imgSrcMovie = result.poster_path;
        if (imgSrcMovie) { /* s'assurer qu'il y a bien une image*/
          const swiperWrapper3 = document.querySelector(".swiper-wrapper3");
          const createDivImg = document.createElement("div");
          createDivImg.className = "swiper-slide";
          const createImg = document.createElement("img");
          createImg.src = `https://image.tmdb.org/t/p/w500${imgSrcMovie}`;
          createDivImg.appendChild(createImg);
          swiperWrapper3.appendChild(createDivImg);

          createDivImg.addEventListener('click', () => {
            displayMovieInfo(result, imgSrcMovie);
          });
        }
      });



    })
    .catch(err => {
      console.error(err);
    });

});
/* fetch animation */

animation.addEventListener("click", () => {
  swiperWrapper3.innerHTML = "";
  adaptative2.innerText = "Animation";

  fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16', options)
    .then(response => response.json())
    .then(data => {

      const swiper3 = new Swiper('.s3', {
        loop: true,
        slidesPerView: '4',
        spaceBetween: 19,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
      data.results.forEach(result => {
        const imgSrcMovie = result.poster_path;
        if (imgSrcMovie) { /* s'assurer qu'il y a bien une image*/
          const swiperWrapper3 = document.querySelector(".swiper-wrapper3");
          const createDivImg = document.createElement("div");
          createDivImg.className = "swiper-slide";
          const createImg = document.createElement("img");
          createImg.src = `https://image.tmdb.org/t/p/w500${imgSrcMovie}`;
          createDivImg.appendChild(createImg);
          swiperWrapper3.appendChild(createDivImg);

          createDivImg.addEventListener('click', () => {

            displayMovieInfo(result, imgSrcMovie);

          });
        }
      });



    })
    .catch(err => {
      console.error(err);
    });

});

/*------------------- MODAL REGISTER/LOGIN -----------------------------*/
const modalRegister = document.querySelector(".modalRegister");
const registerBtnMenu = document.querySelector(".register");
const signinBtnMenu = document.querySelector(".signin");
const registerBtnMenu2 = document.querySelector(".register2");
const signinBtnMenu2 = document.querySelector(".signin2");
const closeModal = document.querySelector(".closeModal");
const closeModalMovies = document.querySelector(".closeModalMovies");
const buttonSwitchSignup = document.querySelector(".buttonSwitchSignup");
const buttonSwitchLogin = document.querySelector(".buttonSwitchLogin");
const signup = document.querySelector(".signup");
const formRegister = document.querySelector(".formRegister");
const formLogin = document.querySelector(".formLogin");
const login = document.querySelector(".login");



function switchToRegister() {
  buttonSwitchSignup.style.backgroundColor = "#C00";
  buttonSwitchSignup.style.borderColor = "#C00";
  buttonSwitchLogin.style.backgroundColor = "black";
  buttonSwitchLogin.style.borderColor = "white";
  buttonSwitchLogin.style.borderWidth = "1px 1px 1px 0px";
  formLogin.style.display = "none";
  formRegister.style.display = "block";
}


registerBtnMenu.addEventListener("click", () => {
  modalRegister.showModal();
switchToRegister()
});

registerBtnMenu2.addEventListener("click", () => {
  modalRegister.showModal();
  switchToRegister()
});

buttonSwitchSignup.addEventListener("click", () => {
  switchToRegister()
});

signup.addEventListener("click", () => {
  switchToRegister()
});

function switchToLogIn() {
  buttonSwitchLogin.style.backgroundColor = "#C00";
  buttonSwitchSignup.style.backgroundColor = "black";
  buttonSwitchLogin.style.borderColor = "#C00";
  buttonSwitchSignup.style.borderColor = "white";
  buttonSwitchSignup.style.borderWidth = "1px 0px 1px 1px";
  formLogin.style.display = "block";
  formRegister.style.display = "none";
}

signinBtnMenu.addEventListener("click", () => {
  modalRegister.showModal();
  switchToLogIn()
});

signinBtnMenu2.addEventListener("click", () => {
  modalRegister.showModal();
  switchToLogIn()
});

buttonSwitchLogin.addEventListener("click", () => {
  switchToLogIn()

});



login.addEventListener("click", () => {
  switchToLogIn()

});





closeModal.addEventListener("click", () => {
  modalRegister.close();
});

closeModalMovies.addEventListener("click", () => {
  modalMovies.close();
});



/* ---------------- MODAL REGISTER----------------- */




