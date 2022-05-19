// function debounces(func, wait = 20, immediate = true) {
//     var timeout;
//     return function() {
//       var context = this, args = arguments;
//       var later = function() {
//         timeout = null;
//         if (!immediate) func.apply(context, args);
//       };
//       var callNow = immediate && !timeout;
//       clearTimeout(timeout);
//       timeout = setTimeout(later, wait);
//       if (callNow) func.apply(context, args);
//     };
//   };

//   const flipperSlides = document.querySelectorAll('.flip')

//   function flipSlides() {
//     flipperSlides.forEach(flipperSlide => {
//       const slideIn = (window.scrollY + window.innerHeight) - flipperSlide.height / 2;
//       const imgBottom = flipperSlide.offsetTop + flipperSlide.height;
//       const isHalf = slideIn > flipperSlide.offsetTop;
//       const isNotScrolled = window.scrollY < imgBottom;
//       if (isHalf && isNotScrolled) {
//         flipperSlide.classList.add('open');
//       } else {
//         flipperSlide.classList.remove('open');
//       }
//     });
//   }
  
//   window.addEventListener('scroll', debounces(flipSlides));

  

function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
  
  
  
  const sliderImages = document.querySelectorAll('.expand');
  
  
  function checkSlide() {
    sliderImages.forEach(sliderImage => {
      const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
      const imageBottom = sliderImage.offsetTop + sliderImage.height;
      const isHalfShown = slideInAt > sliderImage.offsetTop;
      const isNotScrolledPast = window.scrollY < imageBottom;
      if (isHalfShown && isNotScrolledPast) {
        sliderImage.classList.add('active');
      } else {
        sliderImage.classList.remove('active');
      }
    });
  }
  
  
  window.addEventListener('scroll', debounce(checkSlide));