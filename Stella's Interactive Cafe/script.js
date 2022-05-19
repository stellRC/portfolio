
const konami = document.querySelector('.konami')
const btnLight = document.querySelector('.btn--light')
const btnMenu = document.querySelector('.btn--menu')
const btnAbout = document.querySelector('.btn--about')
const btnBook = document.querySelector('.btn--book')
const btnBackPack = document.querySelector('.btn--backpack')
const btn = document.querySelectorAll('.btn') 

const sidebarMenu = document.querySelector('.sidebar--menu')
const sidebarAbout = document.querySelector('.sidebar--about')
const sidebarBook = document.querySelector('.sidebar--book')
const sidebarBackPack = document.querySelector('.sidebar--backpack')

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.togglee');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider')
const fullScreenButton = player.querySelector('.full-screen')
const muteIconContainer = document.getElementById('mute-icon');



function turnOn() {
    btnLight.classList.toggle('light--on')
}

function showMenu() {
    
    sidebarMenu.classList.toggle('show')
    btnMenu.classList.toggle('rotate')

    if (sidebarBook.classList.contains('show')) {
        sidebarBook.classList.toggle('show')
        btnBook.classList.toggle('rotate')
    }

    if (sidebarAbout.classList.contains('show')) {
        sidebarAbout.classList.toggle('show')
        btnAbout.classList.toggle('rotate')
    }   

    if(sidebarBackPack.classList.contains('show')) {
        sidebarBackPack.classList.toggle('show')
        btnBackPack.classList.toggle('light--on')
        video.pause();
    }
}


function showAbout() {

    sidebarAbout.classList.toggle('show')
    btnAbout.classList.toggle('rotate')
    
    if (sidebarMenu.classList.contains('show')) {
        sidebarMenu.classList.toggle('show')
        btnMenu.classList.toggle('rotate')
    }

    if (sidebarBook.classList.contains('show')) {
        sidebarBook.classList.toggle('show')
        btnBook.classList.toggle('rotate')
    }

    if(sidebarBackPack.classList.contains('show')) {
        sidebarBackPack.classList.toggle('show')
        btnBackPack.classList.toggle('light--on')
        video.pause();
    }
}



function showBook() {
    sidebarBook.classList.toggle('show')
    btnBook.classList.toggle('rotate')
    
    if(sidebarMenu.classList.contains('show')) {
        sidebarMenu.classList.toggle('show')
        btnMenu.classList.toggle('rotate')
    }

    if(sidebarAbout.classList.contains('show')) {
        sidebarAbout.classList.toggle('show')
        btnAbout.classList.toggle('rotate')
    }

    if(sidebarBackPack.classList.contains('show')) {
        sidebarBackPack.classList.toggle('show')
        btnBackPack.classList.toggle('light--on')
        video.pause();
    }
}

function showPack() {
    sidebarBackPack.classList.toggle('show')
    btnBackPack.classList.toggle('light--on')

    if (sidebarBackPack.classList.contains('show')) {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    } else {
        video.pause();
    }
    

    if(sidebarMenu.classList.contains('show')) {
        sidebarMenu.classList.toggle('show')
        btnMenu.classList.toggle('rotate')
    }

    if(sidebarAbout.classList.contains('show')) {
        sidebarAbout.classList.toggle('show')
        btnAbout.classList.toggle('rotate')
    }

    if (sidebarBook.classList.contains('show')) {
        sidebarBook.classList.toggle('show')
        btnBook.classList.toggle('rotate')
    }
}

function togglePlay() {
   if (sidebarBackPack.classList.contains('show')) {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }  
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}


function launchIntoFullScreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

function exitFullScreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
var fullscreen = false;

function toggleFullScreen() {
    fullscreen? exitFullScreen() : launchIntoFullScreen(player)
    fullscreen = !fullscreen;
}

function handleKeyPress(e) {
    if(e.key === 'Escape') {
        toggleFullScreen();
    }

    if(e.key === ' ' ) {
        togglePlay();
    }
}

const pressed = [];
secretCode = 'coffee';


function toggleKonami() {
    cornify_add();
}

window.addEventListener('keyup', (e) => {
    console.log(e.key)
    pressed.push(e.key);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    if(pressed.join('').includes(secretCode)) {
        cornify_add();
    }
    console.log(pressed)
})

konami.addEventListener('click', toggleKonami)
btnLight.addEventListener('click', turnOn)
btnMenu.addEventListener('click', showMenu)
btnAbout.addEventListener('click', showAbout)
btnBook.addEventListener('click', showBook)
btnBackPack.addEventListener('click', showPack)

window.addEventListener('keydown', handleKeyPress)

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

skipButtons.forEach(button => button.addEventListener('click', skip))
toggle.addEventListener('click', togglePlay)
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate)) 
fullScreenButton.addEventListener('click', toggleFullScreen)



progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false)





