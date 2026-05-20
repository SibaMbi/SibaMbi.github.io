import { initTestimonialSlider, enableDragScrollX, initHeaderMenu } from './modules/index_utilities.js';

initHeaderMenu();
initTestimonialSlider(document.querySelector(".testimonial-page"));

document.querySelectorAll(".hero-features-list, .about-benefits, .services-grid").forEach((el) => {
  enableDragScrollX(el);
});

const revealTargets = document.querySelectorAll(
  [
    ".hero-visual",
    ".hero-feature-card",
    ".security-message",
    ".security-map",
    ".security-icon-card",
    ".collection-page",
    ".about-sales",
    ".about-feature",
    ".services-message",
    ".service-card",
    ".testimonial-left",
    ".testimonial-right",
    ".testimonial-controls",
    ".cta-inner",
    ".footer-content",
  ].join(", ")
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -10% 0px",
  }
);

revealTargets.forEach((element) => {
  revealObserver.observe(element);
});
