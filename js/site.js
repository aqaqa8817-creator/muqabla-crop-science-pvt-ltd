// =====================
// DETECT PAGE LOCATION
// =====================
const isSubPage = window.location.pathname.includes("/products/");

const basePath = isSubPage ? "../" : "";


document.addEventListener("DOMContentLoaded", () => {

  const repoName = "/muqabla-crop-science-pvt-ltd";

  fetch (repoName + "/header.html")
    .then(res => res.text())
    .then(data => {
      const header = document.getElementById("header");
      if (header) header.innerHTML = data;
    })
    .catch(err => console.error("Header Error:", err));

  fetch( repoName+ "/footer.html")
    .then(res => res.text())
    .then(data => {
      const footer = document.getElementById("footer");
      if (footer) footer.innerHTML = data;
    })
    .catch(err => console.error("Footer Error:", err));

});

// =====================
// SLIDER CODE
// =====================
document.addEventListener("DOMContentLoaded", () => {

  let currentIndex = 0;

  const slider = document.getElementById("slider");
  const slides = document.querySelectorAll("#slider > div");
  const totalSlides = slides.length;

  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  const dotsContainer = document.getElementById("dots");

  if (!slider || !nextBtn || !prevBtn || !dotsContainer || totalSlides === 0) {
    console.warn("Slider elements missing in HTML");
    return;
  }

  // CREATE DOTS
  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "w-3 h-3 bg-white/50 rounded-full cursor-pointer";

    dot.addEventListener("click", () => {
      currentIndex = i;
      updateSlider();
    });

    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.children;

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    Array.from(dots).forEach(dot => dot.classList.remove("bg-white"));
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add("bg-white");
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // AUTO SLIDE
  let autoSlide = setInterval(nextSlide, 4000);

  slider.addEventListener("mouseenter", () => clearInterval(autoSlide));
  slider.addEventListener("mouseleave", () => {
    autoSlide = setInterval(nextSlide, 4000);
  });

  // TOUCH SWIPE
  let startX = 0;

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) nextSlide();
    if (endX - startX > 50) prevSlide();
  });

  updateSlider();
});