/**
* Template Name: UpConstruction - v1.3.0
* Template URL: https://bootstrapmade.com/upconstruction-bootstrap-construction-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Mobile Navigation System
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');
  const navbar = document.querySelector('.navbar');
  const body = document.body;

  // Toggle mobile navigation
  function openMobileNav() {
    body.classList.add('mobile-nav-active');
    if (mobileNavShow) mobileNavShow.classList.add('d-none');
    if (mobileNavHide) mobileNavHide.classList.remove('d-none');
  }

  function closeMobileNav() {
    body.classList.remove('mobile-nav-active');
    if (mobileNavShow) mobileNavShow.classList.remove('d-none');
    if (mobileNavHide) mobileNavHide.classList.add('d-none');
    // Close all dropdowns when closing nav
    document.querySelectorAll('.navbar .dropdown').forEach(dropdown => {
      dropdown.classList.remove('dropdown-active');
      const indicator = dropdown.querySelector('.dropdown-indicator');
      if (indicator) {
        indicator.classList.remove('bi-chevron-up');
        indicator.classList.add('bi-chevron-down');
      }
    });
  }

  // Event listeners for mobile nav toggle buttons
  if (mobileNavShow) {
    mobileNavShow.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openMobileNav();
    });
  }

  if (mobileNavHide) {
    mobileNavHide.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeMobileNav();
    });
  }

  // Handle dropdown toggles in mobile nav (only for parent dropdown links)
  // Track last toggle time to prevent double-firing on mobile (touch + click)
  let lastDropdownToggle = 0;
  
  document.querySelectorAll('.navbar .dropdown > a').forEach(dropdownLink => {
    // Prevent the default anchor behavior completely on mobile
    dropdownLink.addEventListener('click', function(e) {
      // Check if we're on mobile
      if (body.classList.contains('mobile-nav-active')) {
        // Debounce - prevent double-firing on touch devices
        const now = Date.now();
        if (now - lastDropdownToggle < 300) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
        lastDropdownToggle = now;
        
        // This is a dropdown parent link - prevent navigation and toggle dropdown
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        const parentDropdown = this.parentElement;
        const indicator = this.querySelector('.dropdown-indicator');
        
        // Toggle current dropdown
        if (parentDropdown.classList.contains('dropdown-active')) {
          parentDropdown.classList.remove('dropdown-active');
          if (indicator) {
            indicator.classList.remove('bi-chevron-up');
            indicator.classList.add('bi-chevron-down');
          }
        } else {
          parentDropdown.classList.add('dropdown-active');
          if (indicator) {
            indicator.classList.remove('bi-chevron-down');
            indicator.classList.add('bi-chevron-up');
          }
        }
        
        return false;
      }
    }, true); // Use capture phase
  });

  // Handle clicks on regular nav links (NOT dropdown parents) - allow normal navigation
  document.querySelectorAll('.navbar > ul > li:not(.dropdown) > a').forEach(link => {
    link.addEventListener('click', function(e) {
      // Allow the default link behavior - browser will navigate
      console.log('Navigating to:', this.href);
    });
  });

  // Handle clicks on dropdown menu items - allow normal navigation
  document.querySelectorAll('.navbar .dropdown ul a').forEach(link => {
    link.addEventListener('click', function(e) {
      // Allow the default link behavior - browser will navigate
      console.log('Navigating to dropdown item:', this.href);
    });
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function(el) {
        el.addEventListener('click', function() {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 2 slides at once in desktop view
   */
  new Swiper('.slides-2', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate pURE cOUNTER
   */
  new PureCounter();

  /**
   * Animation on scroll function and init
   */
  /**
   * Projects Section Functionality
   */
  
  // Image Carousel for Project Cards with Auto-rotation
  function initProjectCarousels() {
    const projectCards = document.querySelectorAll('.project-card-modern');
    
    projectCards.forEach((card, cardIndex) => {
      const images = card.querySelectorAll('.image-carousel img');
      if (images.length <= 1) return;
      
      let currentIndex = 0;
      let autoInterval;
      let hoverInterval;
      
      function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
      }
      
      function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      }
      
      // Start automatic rotation immediately with staggered timing
      function startAutoRotation() {
        autoInterval = setInterval(nextImage, 3000 + (cardIndex * 500)); // Stagger by 500ms per card
      }
      
      // Faster rotation on hover
      function startHoverRotation() {
        clearInterval(autoInterval);
        hoverInterval = setInterval(nextImage, 1200);
      }
      
      function stopHoverRotation() {
        clearInterval(hoverInterval);
        startAutoRotation();
      }
      
      // Initialize auto-rotation
      startAutoRotation();
      
      // Hover events for faster rotation
      card.addEventListener('mouseenter', startHoverRotation);
      card.addEventListener('mouseleave', stopHoverRotation);
      
      // Pause auto-rotation when page is not visible
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          clearInterval(autoInterval);
          clearInterval(hoverInterval);
        } else {
          startAutoRotation();
        }
      });
    });
  }
  
  // Filter Functionality
  function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn-modern');
    const projectCards = document.querySelectorAll('.project-card-modern');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach((card, index) => {
          if (filter === '*' || card.classList.contains(filter.substring(1))) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, index * 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
  
  // Initialize projects functionality
  if (document.querySelector('.projects-section-modern')) {
    initProjectCarousels();
    initProjectFilters();
  }

  function aos_init() {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});
