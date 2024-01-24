const burgerBtn = document.querySelector('.burger');
const burgerMenu = document.querySelector('.menu__list');

burgerBtn.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
})


const catalogSlider = document.querySelector('.catalog-slider-main .catalog-slider');
const catalogSliderItem = document.querySelector('.catalog-slider-item');
const catalogSliderImg = document.querySelectorAll('.catalog-slider-item');
const prev = document.querySelector('.prev-btn');
const next = document.querySelector('.next-btn');
let count = 0;
let width;

if (window.innerWidth < 1150) {
    width = catalogSliderItem.offsetWidth + 40;
} else {
    width = catalogSliderItem.offsetWidth + 60;
}

window.addEventListener('resize', () => {
    if (this.innerWidth < 1150) {
        width = catalogSliderItem.offsetWidth + 40;
    } else {
        width = catalogSliderItem.offsetWidth + 60;
    }
    sliderMove();
})

next.addEventListener('click', () => {
    count++;
    if (window.innerWidth > 1050) {
        if (count > catalogSliderImg.length - 3) {
            count = catalogSliderImg.length - 3;
        }
    } else if (window.innerWidth < 1050 && window.innerWidth > 610) {
        if (count > catalogSliderImg.length - 2) {
            count = catalogSliderImg.length - 2;
        }
    } else if (window.innerWidth <= 610) {
        if (count > catalogSliderImg.length - 1) {
            count = catalogSliderImg.length - 1;
        }
    }
    sliderMove();
});

prev.addEventListener('click', () => {
    count--;
    if (count < 0) {
        count = 0;
    }
    sliderMove();
})

function sliderMove() {
    catalogSlider.style.transform = 'translate(-' + count * width + 'px)';
    catalogSlider.style.transition = 'transform 0.4s ease'
}

const catalogMain = document.querySelector('.catalog-slider-main');

catalogMain.addEventListener('touchstart', handleTouchStart, false);
catalogMain.addEventListener('touchmove', handleTouchMove, false);

let x1 = 0;
let y1 = 0;

function handleTouchStart(event) {
    x1 = event.touches[0].clientX;
    y1 = event.touches[0].clientY;
}

function handleTouchMove(event) {
    if (x1 == 0 || y1 == 0) {
        return false;
    }
    let x2 = event.touches[0].clientX;
    let y2 = event.touches[0].clientY;

    let xDiff = x2 - x1;
    let yDiff = y2 - y1;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        //right or left
        if (xDiff < 0) {
            //left
            count++;
            if (window.innerWidth > 1050) {
                if (count > catalogSliderImg.length - 3) {
                    count = catalogSliderImg.length - 3;
                }
            } else if (window.innerWidth < 1050 && window.innerWidth > 610) {
                if (count > catalogSliderImg.length - 2) {
                    count = catalogSliderImg.length - 2;
                }
            } else if (window.innerWidth <= 610) {
                if (count > catalogSliderImg.length - 1) {
                    count = catalogSliderImg.length - 1;
                }
            }
            sliderMove();
        } else {
            //right
            count--;
            if (count < 0) {
                count = 0;
            }
            sliderMove();
        }
    }

    x1 = 0;
    y1 = 0;
}


const catalogPopup = document.querySelector('.catalog-pop-up-main');
const closePopup = document.querySelector('.pop-up-close');
const popupTitle = document.querySelector('.catalog-pop-up-title');
const popupImg = document.querySelectorAll('.catalog-pop-up-img');

catalogSliderImg.forEach(p => {
    p.addEventListener('click', () => {
        let titleImg = popupTitle.attributes[0].ownerElement.innerText;
        let titlePopup = p.attributes[0].ownerElement.children[1].innerText;
        let titles = (titleImg = titlePopup);
        console.log(titles);
        popupTitle.innerHTML = titles;
        let urlImg = p.attributes[0].ownerElement.children[0].attributes[0].value;
        console.log(parseInt(urlImg.match(/[0-9]/)[0], 10));
        console.log(popupImg[(parseInt(urlImg.match(/[0-9]/)[0], 10)) - 1]);
        console.log(p.attributes);
        popupImg.forEach(pImg => {
            pImg.attributes.src.value = 'images/pop-up-' + parseInt(pImg.attributes.src.value.match(/[0-9]/)[0], 10) + '-' + parseInt(urlImg.match(/[0-9]/)[0], 10) + '.jpg';
        })
        catalogPopup.classList.add('open');
        document.querySelector('body').style.overflow = 'hidden';
    })
})

closePopup.addEventListener('click', () => {
    catalogPopup.classList.remove('open');
    document.querySelector('body').style.overflow = 'scroll';
})