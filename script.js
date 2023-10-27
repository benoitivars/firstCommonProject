document.addEventListener('DOMContentLoaded', (event) => {
    // Initialize Swiper instances
    initializeSwipers();
    
    // Set up modal event listeners
    setupModalEvents();
  });
  
  function initializeSwipers() {
    const swiper1 = new Swiper('#s1', {
      slidesPerView: 4,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  
    const swiper2 = new Swiper('#s2', {
      slidesPerView: 4,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  
    const swiper3 = new Swiper('#s3', {
      slidesPerView: 4,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
  
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