import { initTestimonialSlider, enableDragScrollX, initHeaderMenu } from './modules/index_utilities.js';

initHeaderMenu();
initTestimonialSlider(document.querySelector(".testimonial-page"));

document.querySelectorAll(".hero-features-list, .about-benefits, .services-grid").forEach((el) => {
  enableDragScrollX(el);
});
