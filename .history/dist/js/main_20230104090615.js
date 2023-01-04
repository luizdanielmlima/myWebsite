$(document).ready(function () {
  $('.toggle').click(function () {
    //console.log('menu icon clicked!');
    $('.menu-links-ul').toggleClass('active');
  });

  $('#videoModal').on('shown.bs.modal', function (e) {
    //console.log('modal has appeared');
  });

  $('#videoModal').on('hidden.bs.modal', function (e) {
    // console.log('modal has been closed');
    $('#videoModal iframe').attr(
      'src',
      $('#videoModal iframe').attr('src'),
    );
  });
});

// *START* Intersection Observer stuff!

// DOM: array of the section titles
const obsPageAreas = document.querySelectorAll('[data-obs]');
const menuItems = ['home', , 'whatido', 'about', 'portfolio'];
let menuLabel = document.getElementById(`nav-home`);
menuLabel.classList.toggle('menu-highlight');

const config = {
  root: null, // avoiding 'root' or setting it to 'null' sets it to default value: viewport
  rootMargin: '0px',
  threshold: 0.8,
};

let isLeaving = false;

setActiveMenuLabel = (item) => {
  cleanLabelsHighLight();
  menuLabel = document.getElementById(`nav-${item}`);

  // since portfolio is large, I want to highlight it when contact leaves the page
  if (isLeaving === false) {
    menuLabel = document.getElementById('nav-portfolio');
  }

  menuLabel.classList.toggle('menu-highlight');
};

cleanLabelsHighLight = () => {
  menuItems.forEach((item) => {
    const menu = document.getElementById(`nav-${item}`);
    menu.classList.remove('menu-highlight');
  });
};

let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Do something with entering entry
      isLeaving = true;
      setActiveMenuLabel(entry.target.dataset.obs);
    } else if (isLeaving) {
      // Do something with exiting entry
      isLeaving = false;
      if (entry.target.dataset.obs === 'contact') {
        setActiveMenuLabel(entry.target.dataset.obs);
      }
    }
  });
}, config);

// Every main area will be observable for entering the viewport
obsPageAreas.forEach((item) => {
  observer.observe(item);
});

// *END* Intersection Observer stuff
