export function initTestimonialSlider(root) {
  if (!root || !(root instanceof HTMLElement)) return;

  const list = root.querySelector(".testimonial-list");
  const items = Array.from(root.querySelectorAll(".testimonial-item"));
  const prevBtn = root.querySelector("#testimonial-prev");
  const nextBtn = root.querySelector("#testimonial-next");

  if (!list || items.length === 0) return;

  const mod = (n, m) => ((n % m) + m) % m;

  function setActiveAria(liElement) {
    liElement.setAttribute("aria-current", "true");
    liElement.removeAttribute("aria-hidden");
  }

  function setNonActiveAria(liElement) {
    liElement.removeAttribute("aria-current");
    liElement.setAttribute("aria-hidden", "true");
  }

  function getCurrentIndex() {
    return items.findIndex((li) => li.classList.contains("is-active"));
  }

  function applyState(activeIndex) {
    activeIndex = mod(activeIndex, items.length);

    items.forEach((li, i) => {
      const isActive = i === activeIndex ? true : false;

      li.classList.toggle("is-active", isActive);
      isActive ? setActiveAria(li) : setNonActiveAria(li);
    });

    const disable = items.length <= 1 ? true : false;

    if (prevBtn) prevBtn.disabled = disable;
    if (nextBtn) nextBtn.disabled = disable;
  }

  function move(delta) {
    if (items.length <= 1) return;

    let currentIndex = getCurrentIndex();
    currentIndex = currentIndex < 0 ? 0 : currentIndex;

    applyState(currentIndex + delta);
  }

  function onPrevClick(e) {
    e.preventDefault();
    move(-1);
  }

  function onNextClick(e) {
    e.preventDefault();
    move(1);
  }

  function onKeyDown(e) {
    const activeEl = document.activeElement;
    if (!root.contains(activeEl)) return;

    if (activeEl === list || list.contains(activeEl)) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        move(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        move(1);
      }
    }
  }

  // Wire up events
  if (prevBtn) prevBtn.addEventListener("click", onPrevClick);
  if (nextBtn) nextBtn.addEventListener("click", onNextClick);
  document.addEventListener("keydown", onKeyDown);

  // Initial render: ensure one active item (default first)
  let idx = getCurrentIndex();
  idx = idx < 0 ? 0 : idx;
  applyState(idx);
}