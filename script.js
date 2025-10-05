const links = document.querySelectorAll(".nav-links li a");
const highlight = document.querySelector(".nav-highlight");
const navbar = document.querySelector(".navbar");

function updateHighlight(el) {
  const rect = el.getBoundingClientRect();
  const containerRect = el.parentElement.parentElement.getBoundingClientRect();
  highlight.style.width = `${rect.width}px`;
  highlight.style.left = `${rect.left - containerRect.left}px`;
}

// Initialize highlight on active link
const active = document.querySelector(".nav-links li a.active");
if (active) updateHighlight(active);

links.forEach(link => {
  link.addEventListener("mouseover", e => updateHighlight(e.target));
  link.addEventListener("mouseout", () => {
    const activeLink = document.querySelector(".nav-links li a.active");
    if (activeLink) updateHighlight(activeLink);
  });
  link.addEventListener("click", () => {
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    updateHighlight(link);
  });
});

// --- NAVBAR HIDE/SHOW ON SCROLL ---
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY && window.scrollY > 100) {
    // scrolling down past 100px → hide navbar
    navbar.classList.add("hidden");
    navbar.classList.remove("visible");
  } else {
    // scrolling up OR at top → show navbar
    navbar.classList.remove("hidden");
    navbar.classList.add("visible");
  }
  lastScrollY = window.scrollY;
});
