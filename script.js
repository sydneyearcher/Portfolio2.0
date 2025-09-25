const carouselTrack = document.querySelector('.carousel-track');
const slides = Array.from(carouselTrack.children);
const dotsContainer = document.querySelector('.carousel-dots');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentIndex = 0;

// --- Generate dots dynamically ---
dotsContainer.innerHTML = '';
slides.forEach((_, index) => {
  const dot = document.createElement('button');
  if (index === 0) dot.classList.add('active'); // first dot active
  dot.addEventListener('click', () => moveToSlide(index));
  dotsContainer.appendChild(dot);
});

function updateDots() {
  const dots = Array.from(dotsContainer.children);
  dots.forEach((dot, index) => dot.classList.toggle('active', index === currentIndex));
}

function moveToSlide(index) {
  const slideWidth = slides[0].getBoundingClientRect().width;
  carouselTrack.style.transform = `translateX(-${slideWidth * index}px)`;
  currentIndex = index;
  updateDots();
}

// --- Next / Prev button functionality ---
prevButton.addEventListener('click', () => {
  const newIndex = (currentIndex - 1 + slides.length) % slides.length;
  moveToSlide(newIndex);
});

nextButton.addEventListener('click', () => {
  const newIndex = (currentIndex + 1) % slides.length;
  moveToSlide(newIndex);
});

// --- Handle window resize ---
window.addEventListener('resize', () => moveToSlide(currentIndex));

// --- Typewriter ---
document.addEventListener("DOMContentLoaded", () => {
  new Typed(".auto-type", {
    strings: ["Strategist", "Creative", "Web Designer"],
    typeSpeed: 150,
    backSpeed: 150,
    loop: true,
  });
});

// --- Navbar scroll effect ---
document.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 10);
});

// Project Section Header

document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal, .section-title');

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // stops watching once revealed
      }
    });
  }, { threshold: 0.18 });

  revealEls.forEach(el => revealObserver.observe(el));
});

// --- Reveal on scroll (for sections + timeline) ---
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal, .section-title');

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;

      // If inside a timeline, stagger based on index
      const timeline = el.closest('.timeline');
      if (timeline && el.classList.contains('timeline-content')) {
        const items = Array.from(timeline.querySelectorAll('.timeline-content.reveal'));
        const idx = items.indexOf(el);
        el.style.transitionDelay = `${idx * 120}ms`; // stagger timing
      } else {
        el.style.transitionDelay = '0ms';
      }

      // Add visible class → triggers CSS transitions & keyframes
      el.classList.add('visible');

      // stop observing once revealed
      obs.unobserve(el);
    });
  }, { threshold: 0.18 });

  revealEls.forEach(el => revealObserver.observe(el));
});
