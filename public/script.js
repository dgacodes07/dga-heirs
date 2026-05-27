const ebooksPreviewData = [
  {
    type: "Ebook",
    title: "Music Distribution Blueprint",
    description: "A practical guide to building distribution systems for independent creators.",
    link: "ebooks.html"
  },
  {
    type: "Insight",
    title: "Scalable Media Ecosystems",
    description: "An executive overview of content, commerce, and community alignment.",
    link: "blogs.html"
  }
];

const releaseSlides = [
  {
    title: "Omo Ologo",
    subtitle: "Mansa Jabulani Feat Seyi Vibez",
    description: "Mansa Jabulani teams up with Seyi Vibez on Omo Ologo a street vibe jam with winning and shining despite the strugles.",
    artwork: "images/release-1-apple-3000.jpg",
    theme: "royal-gold",
    year: "2021",
    format: "Single"
  },
  {
    title: "Doreme",
    subtitle: "Mansa Jabulani Feat MollyDVybe",
    description: "Doreme is a smooth dancehall vibe where Molly flows on a catchy melody about girls dancing & parting.",
    artwork: "images/release-2-apple-3000.jpg",
    theme: "violet-noir",
    year: "2021",
    format: "Single"
  }
  /*
  Add more releases by copying this block:
  {
    title: "Release Title",
    subtitle: "Mansa Jabulani",
    description: "Short release description.",
    artwork: "images/Your3000x3000Artwork.jpg",
    theme: "midnight-platinum",
    year: "2026",
    format: "Single"
  }
  */
];

function hasGsap() {
  return typeof window.gsap !== "undefined";
}

function animateTo(target, options) {
  if (hasGsap()) {
    window.gsap.to(target, options);
    return;
  }

  if (Object.prototype.hasOwnProperty.call(options, "opacity")) {
    target.style.opacity = options.opacity;
  }

  if (Object.prototype.hasOwnProperty.call(options, "scale")) {
    target.style.transform = `scale(${options.scale})`;
  }

  if (Object.prototype.hasOwnProperty.call(options, "x")) {
    target.style.transform = `translateX(${options.x})`;
  }
}

function renderFeaturedPreviews() {
  const targets = [
    document.getElementById("ebook-preview"),
    document.getElementById("insight-preview")
  ];

  targets.forEach((target, index) => {
    if (!target) return;

    const item = ebooksPreviewData[index];
    target.innerHTML = `
      <span class="tag">${item.type}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <a class="preview-link" href="${item.link}">Open ${item.type}</a>
    `;
  });
}

function renderCompanyCards(data) {
  const carouselContainer = document.getElementById("companies");
  if (carouselContainer) {
    carouselContainer.innerHTML = "";
    const allCompanies = [...data, ...data];

    allCompanies.forEach(company => {
      const div = document.createElement("div");
      div.classList.add("card");

      const logoSrc = company.logo.startsWith("/") ? company.logo : `/${company.logo}`;

      div.innerHTML = `
        <img src="${logoSrc}" alt="${company.name}" />
        <h3>${company.name}</h3>
        <p>${company.description}</p>
        <a href="${company.url}" target="_blank" rel="noopener">Visit &rarr;</a>
      `;
      carouselContainer.appendChild(div);
    });

    const track = document.querySelector(".carousel-track");
    const prevBtn = document.querySelector(".carousel-prev");
    const nextBtn = document.querySelector(".carousel-next");
    let currentIndex = 0;
    const cardWidth = 300;

    if (track && prevBtn && nextBtn && data.length > 0) {
      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + data.length) % data.length;
        track.style.animation = "none";
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      });

      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % data.length;
        track.style.animation = "none";
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      });
    }
  }

  const companiesGrid = document.getElementById("companies-grid");
  if (companiesGrid) {
    companiesGrid.innerHTML = "";
    data.forEach(company => {
      const article = document.createElement("article");
      article.classList.add("company-card");

      const logoSrc = company.logo.startsWith("/") ? company.logo : `/${company.logo}`;

      article.innerHTML = `
        <img src="${logoSrc}" alt="${company.name}" />
        <h3>${company.name}</h3>
        <p>${company.description}</p>
        <a href="${company.url}" target="_blank" rel="noopener">Visit &rarr;</a>
      `;
      companiesGrid.appendChild(article);
    });
  }
}

function loadCompanies() {
  const needsCompanies = document.getElementById("companies") || document.getElementById("companies-grid");
  if (!needsCompanies) return;

  fetch("/api/companies")
    .then(res => {
      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }
      return res.json();
    })
    .then(renderCompanyCards)
    .catch(error => {
      console.error("Failed to load companies:", error);
    });
}

function renderReleaseSlides() {
  const track = document.getElementById("release-track");
  const dots = document.getElementById("release-dots");
  if (!track || !dots) return;

  track.innerHTML = "";
  dots.innerHTML = "";

  releaseSlides.forEach((release, index) => {
    const slide = document.createElement("article");
    slide.className = `release-slide release-theme-${release.theme}`;
    slide.innerHTML = `
      <div class="release-artwork-shell">
        <img
          class="release-artwork"
          src="${release.artwork}"
          alt="${release.title} artwork"
          width="3000"
          height="3000"
        />
      </div>
      <div class="release-info">
        <span class="release-kicker">${release.format} / ${release.year}</span>
        <h3>${release.title}</h3>
        <p class="release-artist">${release.subtitle}</p>
        <p>${release.description}</p>
        <a class="release-link" href="https://music.apple.com/us/artist/mansa-jabulani/1345729877" target="_blank" rel="noopener">Open on Apple Music</a>
      </div>
    `;
    track.appendChild(slide);

    const dot = document.createElement("span");
    dot.className = `slider-dot${index === 0 ? " active" : ""}`;
    dot.dataset.slide = index.toString();
    dots.appendChild(dot);
  });
}

function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach(el => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (top < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

class HeroCarousel {
  constructor() {
    this.slides = document.querySelectorAll(".slide");
    this.dots = document.querySelectorAll(".dot");
    this.prevArrow = document.querySelector(".prev-arrow");
    this.nextArrow = document.querySelector(".next-arrow");
    this.carousel = document.querySelector(".hero-carousel");
    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000;

    if (!this.carousel || this.totalSlides === 0) return;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.showSlide(0);
    this.startAutoPlay();
  }

  setupEventListeners() {
    if (this.prevArrow) {
      this.prevArrow.addEventListener("click", () => this.prevSlide());
    }

    if (this.nextArrow) {
      this.nextArrow.addEventListener("click", () => this.nextSlide());
    }

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    this.carousel.addEventListener("mouseenter", () => this.stopAutoPlay());
    this.carousel.addEventListener("mouseleave", () => this.startAutoPlay());
  }

  showSlide(index) {
    if (!this.slides[index]) return;

    this.slides.forEach(slide => {
      animateTo(slide, {
        opacity: 0,
        scale: 1.1,
        duration: 0.8,
        ease: "power2.out"
      });
      slide.classList.remove("active");
    });

    this.dots.forEach(dot => dot.classList.remove("active"));
    if (this.dots[index]) {
      this.dots[index].classList.add("active");
    }

    animateTo(this.slides[index], {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out"
    });
    this.slides[index].classList.add("active");
    this.currentSlide = index;
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.totalSlides;
    this.showSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.showSlide(prevIndex);
  }

  goToSlide(index) {
    this.showSlide(index);
  }

  startAutoPlay() {
    if (this.totalSlides < 2 || this.autoPlayInterval) return;

    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

class ReleasesSlider {
  constructor() {
    this.track = document.getElementById("release-track") || document.querySelector(".slider-track");
    this.slides = this.track ? this.track.querySelectorAll(".release-slide") : [];
    this.dots = document.querySelectorAll("#release-dots .slider-dot");
    this.prevBtn = document.querySelector(".slider-prev");
    this.nextBtn = document.querySelector(".slider-next");
    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 4000;

    if (!this.track || this.totalSlides === 0) return;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateSlider();
    this.startAutoPlay();
  }

  setupEventListeners() {
    if (this.prevBtn) {
      this.prevBtn.onclick = () => this.prevSlide();
    }

    if (this.nextBtn) {
      this.nextBtn.onclick = () => this.nextSlide();
    }

    this.dots.forEach((dot, index) => {
      dot.onclick = () => this.goToSlide(index);
    });

    const slider = document.querySelector(".releases-slider");
    if (slider) {
      slider.addEventListener("mouseenter", () => this.stopAutoPlay());
      slider.addEventListener("mouseleave", () => this.startAutoPlay());
    }
  }

  updateSlider() {
    animateTo(this.track, {
      x: `${-this.currentSlide * 100}%`,
      duration: 0.8,
      ease: "power2.out"
    });

    this.dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlide);
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlider();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlider();
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlider();
  }

  startAutoPlay() {
    if (this.totalSlides < 2 || this.autoPlayInterval) return;

    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedPreviews();
  loadCompanies();
  renderReleaseSlides();
  revealOnScroll();
  new HeroCarousel();
  new ReleasesSlider();

  document.querySelectorAll(".fade-in").forEach(el => el.classList.add("show"));

  document.querySelectorAll('a[href^="#"], a[href*="html"]').forEach(link => {
    link.addEventListener("click", function(event) {
      const href = this.getAttribute("href");
      if (!href || href.startsWith("#") || !hasGsap()) return;

      event.preventDefault();
      window.gsap.to("body", {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          window.location.href = href;
        }
      });
    });
  });

  if (hasGsap()) {
    window.gsap.from("body", {
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });
  }
});

window.addEventListener("scroll", revealOnScroll);
