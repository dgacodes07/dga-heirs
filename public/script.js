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

fetch("/api/companies")
  .then(res => {
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    const carouselContainer = document.getElementById("companies");
    if (carouselContainer) {
      const allCompanies = [...data, ...data];
      allCompanies.forEach(company => {
        const div = document.createElement("div");
        div.classList.add("card");

        const logoSrc = company.logo.startsWith("/") ? company.logo : `/${company.logo}`;

        div.innerHTML = `
          <img src="${logoSrc}" alt="${company.name}" />
          <h3>${company.name}</h3>
          <p>${company.description}</p>
          <a href="${company.url}" target="_blank">Visit →</a>
        `;
        carouselContainer.appendChild(div);
      });

      const track = document.querySelector(".carousel-track");
      const prevBtn = document.querySelector(".carousel-prev");
      const nextBtn = document.querySelector(".carousel-next");

      let currentIndex = 0;
      const cardWidth = 280 + 20;

      if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
          currentIndex = (currentIndex - 1 + data.length) % data.length;
          track.style.animation = "none";
          track.offsetHeight;
          track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
          track.style.animation = "none";
        });

        nextBtn.addEventListener("click", () => {
          currentIndex = (currentIndex + 1) % data.length;
          track.style.animation = "none";
          track.offsetHeight;
          track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
          track.style.animation = "none";
        });
      }
    }

    const companiesGrid = document.getElementById("companies-grid");
    if (companiesGrid) {
      data.forEach(company => {
        const article = document.createElement("article");
        article.classList.add("company-card");

        const logoSrc = company.logo.startsWith("/") ? company.logo : `/${company.logo}`;

        article.innerHTML = `
          <img src="${logoSrc}" alt="${company.name}" />
          <h3>${company.name}</h3>
          <p>${company.description}</p>
          <a href="${company.url}" target="_blank">Visit →</a>
        `;
        companiesGrid.appendChild(article);
      });
    }
  })
  .catch(error => {
    console.error("Failed to load companies:", error);
  });

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (top < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

const fadeIns = document.querySelectorAll(".fade-in");
fadeIns.forEach(el => el.classList.add("show"));