import {
  initHeaderMenu,
  initTestimonialSlider,
  enableDragScrollX,
  initRevealObserver,
} from './modules/index_utilities.js';

initHeaderMenu();

const testimonialRoot = document.querySelector('.testimonial-page');
initTestimonialSlider(testimonialRoot);

const dragContainers = document.querySelectorAll(
  '.hero-features-list, .about-benefits, .services-grid'
);
dragContainers.forEach(enableDragScrollX);

initRevealObserver();
