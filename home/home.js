// Hero Slider JavaScript - Fixed Version
let currentSlide = 0;
let slideInterval;
const autoSlideDelay = 5000; // 5 seconds
let isTransitioning = false;

// Slider configuration - Add your images here
const slideData = [
    {
        image: '../resources/images/home1/heroImages/hero.webp',
        title: ['Creating', 'Unforgettable', 'Memories']
    },
    {
        image: '../resources/images/home1/heroImages/hero2.webp',
        title: ['Capturing', 'Beautiful', 'Moments']
    },
    {
        image: '../resources/images/home1/heroImages/hero3.webp',
        title: ['Elegant', 'Everlasting', 'Elegance']
    }
];

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing slider...');
    initializeSlider();
});

function initializeSlider() {
    createSlides();
    createIndicators();
    setupArrowListeners();
    startAutoSlide();
    console.log('Slider initialized');
}

function createSlides() {
    const sliderContainer = document.querySelector('.hero--slider--img');
    if (!sliderContainer) {
        console.error('Slider container not found');
        return;
    }

    sliderContainer.innerHTML = ''; // Clear existing content

    slideData.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = `hero--slide ${index === 0 ? 'active' : ''}`;
        slideElement.innerHTML = `<img src="${slide.image}" alt="Slide ${index + 1}">`;
        sliderContainer.appendChild(slideElement);
    });

    console.log('Slides created:', slideData.length);
}

function createIndicators() {
    // Remove existing indicators
    const existingIndicators = document.querySelector('.hero--indicators');
    if (existingIndicators) {
        existingIndicators.remove();
    }

    const indicatorContainer = document.createElement('div');
    indicatorContainer.className = 'hero--indicators';

    slideData.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorContainer.appendChild(indicator);
    });

    document.querySelector('.hero--sec1--div2').appendChild(indicatorContainer);
    console.log('Indicators created');
}

function setupArrowListeners() {
    // Wait a bit to ensure elements are rendered
    setTimeout(() => {
        const leftArrow = document.querySelector('.fa-solid.fa-chevron-left');
        const rightArrow = document.querySelector('.fa-solid.fa-chevron-right');
        const heroSection = document.querySelector('.hero--section');

        console.log('Left arrow found:', !!leftArrow);
        console.log('Right arrow found:', !!rightArrow);

        if (leftArrow) {
            leftArrow.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Left arrow clicked');
                previousSlide();
            });
        }

        if (rightArrow) {
            rightArrow.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Right arrow clicked');
                nextSlide();
            });
        }

        // Alternative approach - listen to the parent container
        const arrowContainer = document.querySelector('.hero--arrow');
        if (arrowContainer) {
            arrowContainer.addEventListener('click', function(e) {
                if (e.target.classList.contains('fa-chevron-left')) {
                    console.log('Left chevron clicked via parent');
                    previousSlide();
                } else if (e.target.classList.contains('fa-chevron-right')) {
                    console.log('Right chevron clicked via parent');
                    nextSlide();
                }
            });
        }

        // Pause auto-slide on hover
        if (heroSection) {
            heroSection.addEventListener('mouseenter', pauseAutoSlide);
            heroSection.addEventListener('mouseleave', startAutoSlide);
        }

        // Keyboard navigation - use left and right chevron key bindings
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'Left') {
                previousSlide();
            } else if (e.key === 'ArrowRight' || e.key === 'Right') {
                nextSlide();
            }
        });
    }, 500);
}

function nextSlide() {
    if (isTransitioning) return;
    
    console.log('Next slide - current:', currentSlide);
    currentSlide = (currentSlide + 1) % slideData.length;
    updateSlider();
    resetAutoSlide();
}

function previousSlide() {
    if (isTransitioning) return;
    
    console.log('Previous slide - current:', currentSlide);
    currentSlide = currentSlide === 0 ? slideData.length - 1 : currentSlide - 1;
    updateSlider();
    resetAutoSlide();
}

function goToSlide(index) {
    if (isTransitioning || index === currentSlide) return;
    
    console.log('Go to slide:', index);
    currentSlide = index;
    updateSlider();
    resetAutoSlide();
}

function updateSlider() {
    isTransitioning = true;
    console.log('Updating to slide:', currentSlide);

    // Update slides
    const slides = document.querySelectorAll('.hero--slide');
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    // Update indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });

    // Update content
    updateContent();

    // Reset transition flag
    setTimeout(() => {
        isTransitioning = false;
    }, 800);
}

function updateContent() {
    const contentContainer = document.querySelector('.hero--content .body');
    if (!contentContainer || !slideData[currentSlide]) return;

    const currentSlideData = slideData[currentSlide];
    
    // Fade out
    contentContainer.style.opacity = '0';
    
    setTimeout(() => {
        // Update content
        contentContainer.innerHTML = '';
        currentSlideData.title.forEach(text => {
            const span = document.createElement('span');
            span.className = 'span1';
            span.textContent = text;
            contentContainer.appendChild(span);
        });
        
        // Fade in
        contentContainer.style.opacity = '1';
    }, 300);
}

function startAutoSlide() {
    pauseAutoSlide();
    slideInterval = setInterval(() => {
        nextSlide();
    }, autoSlideDelay);
    console.log('Auto slide started');
}

function pauseAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

function resetAutoSlide() {
    startAutoSlide();
}

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        pauseAutoSlide();
    } else {
        startAutoSlide();
    }
});

// Backup manual functions (in case of conflicts)
window.manualNextSlide = nextSlide;
window.manualPreviousSlide = previousSlide;
window.manualGoToSlide = goToSlide;



// ----------------------section02----------------------------//

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card--section .card");
    const prevBtn = document.querySelector(".sec2-left");
    const nextBtn = document.querySelector(".sec2-right");

    let currentIndex = 0;

    function showCard(index) {
        cards.forEach((card, i) => {
            card.classList.toggle("active", i === index);
        });
    }

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showCard(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % cards.length;
        showCard(currentIndex);
    });

    showCard(currentIndex); // initialize
});



// --------------------testamonial-----------------------//

const testimonials = [
    {
        text: "Bimthanna Flora made our wedding unforgettable! Every detail, from the poruwa to the entrance décor, was filled with love and elegance. The flowers were breathtaking, and we felt like we were in a dream. Thank you for bringing our vision to life!",
        client: "Supun & Shanika"
    },
    {
        text: "The team at Bimthanna Flora turned our wedding into a magical experience. Every flower arrangement was perfect, and the service was exceptional. Truly a memorable day we will cherish forever.",
        client: "Kasun & Nadeesha"
    },
    {
        text: "Absolutely stunning work! The decorations and floral arrangements exceeded our expectations. The team was professional, creative, and attentive to every detail.",
        client: "Thilina & Ashini"
    }
];

let currentIndex = 0;

const testimonialText = document.getElementById("testimonial-text");
const clientName = document.getElementById("client-name");
const leftBtn = document.querySelector(".sec4-left");
const rightBtn = document.querySelector(".sec4-right");

function updateTestimonial(index) {
    testimonialText.textContent = testimonials[index].text;
    clientName.textContent = testimonials[index].client;
}

// Left arrow click
leftBtn.addEventListener("click", () => {
    currentIndex--;
    if(currentIndex < 0) currentIndex = testimonials.length - 1;
    updateTestimonial(currentIndex);
});

// Right arrow click
rightBtn.addEventListener("click", () => {
    currentIndex++;
    if(currentIndex >= testimonials.length) currentIndex = 0;
    updateTestimonial(currentIndex);
});
