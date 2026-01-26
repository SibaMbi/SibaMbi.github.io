export function initHeaderMenu(){
    const header = document.querySelector('#site-header');
    if(!header) return;

    const toggleBtn = header.querySelector("#toggle-btn");
    if(!toggleBtn) return;

    const DESKTOP_QUERY = window.matchMedia('(min-width: 768px)');

    function toggleIsOpen() {
        return header.classList.contains("is-menu-open");
    }

    function setAriaAttr(openState) {
        toggleBtn.setAttribute('aria-expanded', String(openState));
        toggleBtn.setAttribute('aria-label', openState ? "Close Menu" : "Open Menu");
    }

    function openMenu () {
        header.classList.add('is-menu-open');
        document.body.classList.add('menu-open');
        setAriaAttr(true);
    }

    function closeMenu (){
        header.classList.remove('is-menu-open');
        document.body.classList.remove('menu-open');
        setAriaAttr(false);
    }

    function toggleMenu () {
        toggleIsOpen() ? closeMenu() : openMenu();
    }

    toggleBtn.addEventListener('click', toggleMenu);

    document.addEventListener("keydown", (e) =>{
        if (e.key !== 'Escape') return;
        if(!toggleIsOpen()) return;

        closeMenu();
        toggleBtn.focus();
    });

    function handleBreakpointChange() {
        if (DESKTOP_QUERY.matches) {
            closeMenu();
        }
    }

    if (typeof DESKTOP_QUERY.addEventListener === "function") {
        DESKTOP_QUERY.addEventListener("change", handleBreakpointChange);
    } else {
    // Safari fallback
        DESKTOP_QUERY.addListener(handleBreakpointChange);
    }

    setAriaAttr(false);
}
