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



/* ---------------const modal movie----- */

const titleCard = document.querySelector(".titleCard");
const yearCard = document.querySelector(".yearCard");
const rateCard = document.querySelector(".rateCard");
const genreCard = document.querySelector(".genreCard");
const resumeCard = document.querySelector(".resumeCard");
const castCard = document.querySelector(".castCard");
const modalMovies = document.querySelector(".modalMovies");
const imgMovieModal = document.querySelector(".imgMovieModal");

/* FETCH GENRE */

function displayMovieInfo(result, imgSrcMovie) {

  modalMovies.showModal();
  imgMovieModal.src = `https://image.tmdb.org/t/p/w500${imgSrcMovie}`;
  titleCard.innerText = result.title;
  yearCard.innerText = result.release_date.substring(0, 4);
  rateCard.innerText = result.vote_average;
  resumeCard.innerText = result.overview;


  fetch(`https://api.themoviedb.org/3/movie/${result.id}?language=en-US&append_to_response=credits`, options)
    .then(response => response.json())
    .then(movieData => {
      const genreNames = movieData.genres.map(genre => genre.name);
      genreCard.innerText = genreNames.join(', ');

      // Obtenir les acteurs principaux (les 5 premiers)
      const topActors = movieData.credits.cast.slice(0, 5); // Les 5 premiers acteurs
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
            modalMovies.showModal();
            imgMovieModal.src = `https://image.tmdb.org/t/p/w500${imgSrcMovie}`;
            titleCard.innerText = result.title;
            yearCard.innerText = result.release_date.substring(0, 4);
            rateCard.innerText = result.vote_average;
            resumeCard.innerText = result.overview;

            displayMovieInfo(result, imgSrcMovie);


          });
        }
      });



    })
    .catch(err => {
      console.error(err);
    });
});



/*  -----------------SWIPER2 */


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


        /* creer une div dans la createDivImg avec le texte le rendre visible en hover et faire le style en css */

        /* hover */

        const createDiv = document.createElement("div");
        const createP = document.createElement("p");
        createP.innerText=result.title;
        createDiv.appendChild(createP);
        createDiv.className = "movieHover";
        createDivImg.appendChild(createDiv);

        createDivImg.addEventListener('mouseover', () => {
  createDiv.style.display = "block";
});

createDivImg.addEventListener('mouseout', () => {
  createDiv.style.display = "none";
});
        


        createDivImg.addEventListener('click', () => {
          modalMovies.showModal();
          imgMovieModal.src = `https://image.tmdb.org/t/p/w500${imgSrcMovie}`;
          titleCard.innerText = result.title;
          yearCard.innerText = result.release_date.substring(0, 4);
          rateCard.innerText = result.vote_average;
          resumeCard.innerText = result.overview;

        

          fetch(`https://api.themoviedb.org/3/movie/${result.id}?language=en-US&append_to_response=credits`, options)
            .then(response => response.json())
            .then(movieData => {
              const genreNames = movieData.genres.map(genre => genre.name);
              genreCard.innerText = genreNames.join(', ');

              // Obtenir les acteurs principaux (les 5 premiers)
              const topActors = movieData.credits.cast.slice(0, 5); // Les 5 premiers acteurs
              const actorsText = topActors.map(actor => actor.name).join(', ');
              castCard.innerText = actorsText;
            })
            .catch(err => {
              console.error(err);
            });

      

        });
      }
    });
  })
  .catch(err => {
    console.error(err);
  });



/*  -----------------SWIPER3------------------------------ */
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
          modalMovies.showModal();
          imgMovieModal.src = `https://image.tmdb.org/t/p/w500${imgSrcMovie}`;
          titleCard.innerText = result.title;
          yearCard.innerText = result.release_date.substring(0, 4);
          rateCard.innerText = result.vote_average;
          resumeCard.innerText = result.overview;

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
            modalMovies.showModal();
            imgMovieModal.src = `https://image.tmdb.org/t/p/w500${imgSrcMovie}`;
            titleCard.innerText = result.title;
            yearCard.innerText = result.release_date.substring(0, 4);
            rateCard.innerText = result.vote_average;
            resumeCard.innerText = result.overview;

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
            modalMovies.showModal();
            imgMovieModal.src = `https://image.tmdb.org/t/p/w500${imgSrcMovie}`;
            titleCard.innerText = result.title;
            yearCard.innerText = result.release_date.substring(0, 4);
            rateCard.innerText = result.vote_average;
            resumeCard.innerText = result.overview;

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
            modalMovies.showModal();
            imgMovieModal.src = `https://image.tmdb.org/t/p/w500${imgSrcMovie}`;
            titleCard.innerText = result.title;
            yearCard.innerText = result.release_date.substring(0, 4);
            rateCard.innerText = result.vote_average;
            resumeCard.innerText = result.overview;

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
            modalMovies.showModal();
            imgMovieModal.src = `https://image.tmdb.org/t/p/w500${imgSrcMovie}`;
            titleCard.innerText = result.title;
            yearCard.innerText = result.release_date.substring(0, 4);
            rateCard.innerText = result.vote_average;
            resumeCard.innerText = result.overview;

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
            modalMovies.showModal();
            imgMovieModal.src = `https://image.tmdb.org/t/p/w500${imgSrcMovie}`;
            titleCard.innerText = result.title;
            yearCard.innerText = result.release_date.substring(0, 4);
            rateCard.innerText = result.vote_average;
            resumeCard.innerText = result.overview;

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
            modalMovies.showModal();
            imgMovieModal.src = `https://image.tmdb.org/t/p/w500${imgSrcMovie}`;
            titleCard.innerText = result.title;
            yearCard.innerText = result.release_date.substring(0, 4);
            rateCard.innerText = result.vote_average;
            resumeCard.innerText = result.overview;

            displayMovieInfo(result, imgSrcMovie);

          });
        }
      });



    })
    .catch(err => {
      console.error(err);
    });

}); 

/*------------------- MODAL -----------------------------*/
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

registerBtnMenu.addEventListener("click", () => {
  modalRegister.showModal();
  buttonSwitchSignup.style.backgroundColor = "#C00";
  buttonSwitchLogin.style.backgroundColor = "black";
  buttonSwitchSignup.style.borderColor = "#C00";
  buttonSwitchLogin.style.borderColor = "white";
  buttonSwitchLogin.style.borderWidth = "1px 1px 1px 0px";
  formLogin.style.display = "none";
  formRegister.style.display = "block";
});

registerBtnMenu2.addEventListener("click", () => {
  modalRegister.showModal();
  buttonSwitchSignup.style.backgroundColor = "#C00";
  buttonSwitchLogin.style.backgroundColor = "black";
  buttonSwitchSignup.style.borderColor = "#C00";
  buttonSwitchLogin.style.borderColor = "white";
  buttonSwitchLogin.style.borderWidth = "1px 1px 1px 0px";
  formLogin.style.display = "none";
  formRegister.style.display = "block";
});

buttonSwitchSignup.addEventListener("click", () => {
  buttonSwitchSignup.style.backgroundColor = "#C00";
  buttonSwitchLogin.style.backgroundColor = "black";
  buttonSwitchSignup.style.borderColor = "#C00";
  buttonSwitchLogin.style.borderColor = "white";
  buttonSwitchLogin.style.borderWidth = "1px 1px 1px 0px";
  formLogin.style.display = "none";
  formRegister.style.display = "block";
});

signinBtnMenu.addEventListener("click", () => {
  modalRegister.showModal();
  buttonSwitchLogin.style.backgroundColor = "#C00";
  buttonSwitchSignup.style.backgroundColor = "black";
  buttonSwitchLogin.style.borderColor = "#C00";
  buttonSwitchSignup.style.borderColor = "white";
  buttonSwitchSignup.style.borderWidth = "1px 0px 1px 1px";
  formLogin.style.display = "block";
  formRegister.style.display = "none";
});

signinBtnMenu2.addEventListener("click", () => {
  modalRegister.showModal();
  buttonSwitchLogin.style.backgroundColor = "#C00";
  buttonSwitchSignup.style.backgroundColor = "black";
  buttonSwitchLogin.style.borderColor = "#C00";
  buttonSwitchSignup.style.borderColor = "white";
  buttonSwitchSignup.style.borderWidth = "1px 0px 1px 1px";
  formLogin.style.display = "block";
  formRegister.style.display = "none";
});

buttonSwitchLogin.addEventListener("click", () => {
  buttonSwitchLogin.style.backgroundColor = "#C00";
  buttonSwitchSignup.style.backgroundColor = "black";
  buttonSwitchLogin.style.borderColor = "#C00";
  buttonSwitchSignup.style.borderColor = "white";
  buttonSwitchSignup.style.borderWidth = "1px 0px 1px 1px";
  formLogin.style.display = "block";
  formRegister.style.display = "none";

});

signup.addEventListener("click", () => {
  buttonSwitchSignup.style.backgroundColor = "#C00";
  buttonSwitchLogin.style.backgroundColor = "black";
  buttonSwitchSignup.style.borderColor = "#C00";
  buttonSwitchLogin.style.borderColor = "white";
  buttonSwitchLogin.style.borderWidth = "1px 1px 1px 0px";
  formLogin.style.display = "none";
  formRegister.style.display = "block";
});

login.addEventListener("click", () => {
  buttonSwitchLogin.style.backgroundColor = "#C00";
  buttonSwitchSignup.style.backgroundColor = "black";
  buttonSwitchLogin.style.borderColor = "#C00";
  buttonSwitchSignup.style.borderColor = "white";
  buttonSwitchSignup.style.borderWidth = "1px 0px 1px 1px";
  formLogin.style.display = "block";
  formRegister.style.display = "none";

});


  


closeModal.addEventListener("click", () => {
  modalRegister.close();
});

closeModalMovies.addEventListener("click", () => {
  modalMovies.close();
});



/* ---------------- MODAL REGISTER----------------- */




