// ===============================
// GLOBAL WEBSITE LOADER
// Header + Footer + Path Fix
// ===============================

function getBasePath() {
  // if page is inside a folder like /products/
  if (window.location.pathname.includes("/products/")) {
    return "../";
  }
  return "/";
}

// Load Header
function loadHeader() {
  const base = getBasePath();

  fetch(base + "style in header.html")
    .then(res => res.text())
    .then(data => {
      const header = document.getElementById("header");
      if (header) header.innerHTML = data;
    });
}

// Load Footer
function loadFooter() {
  const base = getBasePath();

  fetch(base + "footer.html")
    .then(res => res.text())
    .then(data => {
      const footer = document.getElementById("footer");
      if (footer) footer.innerHTML = data;
    });
}

// Auto run when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadFooter();
});