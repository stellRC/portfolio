const imgTop = document.querySelectorAll('.expand--top')





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
const cardFlips = document.querySelectorAll('.flip')


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

function checkFlip() {
  cardFlips.forEach(cardFlip => {
      if (window.scrollY < cardFlip.offsetTop) {
        cardFlip.classList.add('open');
    } else {
        cardFlip.classList.remove('open');
    }
  });
}

window.addEventListener('scroll', debounce(checkFlip));
window.addEventListener('scroll', debounce(checkSlide));

window.addEventListener('load', () => {
  imgTop.style.transform = 'scale(1.2)'
  imgTop.style.transition = 'all .5s ease-in-out'
})

