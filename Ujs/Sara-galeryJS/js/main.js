$('#navbar a').on('click', function(event) {
  if (this.hash !== '') {
    event.preventDefault();

    const hash = this.hash;

    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top-150
      },
      800
    );
  }
});


//  // Sticky menu background
//  window.addEventListener('scroll', function() {
//   if (window.scrollY > 150) {
//   document.querySelector('#navbar').style.opacity = 0.5;
//   } else {
//   document.querySelector('#navbar').style.opacity = 1;
//   }
//   });

