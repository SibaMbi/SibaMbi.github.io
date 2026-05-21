import { initTestimonialSlider, enableDragScrollX, initHeaderMenu } from './modules/index_utilities.js';

initHeaderMenu();
initTestimonialSlider(document.querySelector(".testimonial-page"));

document.querySelectorAll(".hero-features-list, .about-benefits, .services-grid").forEach((el) => {
  enableDragScrollX(el);
});

const statNumberPattern = /\d[\d,]*(?:\.\d+)?/g;

function formatAnimatedValue(value, sourceToken) {
  if (value <= 0) {
    return "0";
  }

  if (sourceToken.includes(".")) {
    const decimalPlaces = sourceToken.split(".")[1]?.length ?? 0;
    return value.toFixed(decimalPlaces);
  }

  return Math.round(value).toLocaleString("en-US");
}

function getStatProgressExponent(targetValue) {
  if (targetValue >= 1000) {
    return 0.6;
  }

  if (targetValue >= 100) {
    return 0.8;
  }

  if (targetValue >= 10) {
    return 1.35;
  }

  return 1.75;
}

function animateAboutStatValue(statValueElement) {
  if (!statValueElement || statValueElement.dataset.countAnimated === "true") {
    return;
  }

  const finalMarkup = statValueElement.innerHTML;
  const tokens = [...finalMarkup.matchAll(statNumberPattern)];

  if (!tokens.length) {
    statValueElement.dataset.countAnimated = "true";
    return;
  }

  const numericParts = tokens.map((token) => ({
    sourceToken: token[0],
    targetValue: Number(token[0].replaceAll(",", "")),
    progressExponent: getStatProgressExponent(Number(token[0].replaceAll(",", ""))),
  }));

  const duration = 3200;
  const startTime = performance.now();

  statValueElement.dataset.countAnimated = "true";

  const renderFrame = (progress) => {
    let tokenIndex = 0;

    statValueElement.innerHTML = finalMarkup.replace(statNumberPattern, () => {
      const { sourceToken, targetValue, progressExponent } = numericParts[tokenIndex++];
      const adjustedProgress = Math.pow(progress, progressExponent);
      const currentValue = targetValue * adjustedProgress;

      return formatAnimatedValue(currentValue, sourceToken);
    });
  };

  const tick = (now) => {
    const elapsed = now - startTime;
    const linearProgress = Math.min(elapsed / duration, 1);
    const easedProgress = 1 - Math.pow(1 - linearProgress, 3);

    renderFrame(easedProgress);

    if (linearProgress < 1) {
      requestAnimationFrame(tick);
      return;
    }

    statValueElement.innerHTML = finalMarkup;
  };

  renderFrame(0);
  requestAnimationFrame(tick);
}

const revealTargets = document.querySelectorAll(
  [
    ".hero-visual",
    ".hero-feature-card",
    ".security-message",
    ".security-map",
    ".security-icon-card",
    ".collection-title",
    ".collection-subtitle",
    ".field",
    ".collection-action",
    ".about-us-title",
    ".about-stat",
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

      if (entry.target.classList.contains("about-stat")) {
        animateAboutStatValue(entry.target.querySelector(".about-stat-value"));
      }

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
