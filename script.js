import projectsData from "./data";
import CSS from "./assets/css.png";
import GIT from "./assets/github.png";
import HTML from "./assets/html.png";
import JS from "./assets/javascript.png";
import TWIND from "./assets/tailwind.png";
import REACT from "./assets/react.png";
import SCSS from "./assets/scss.png";

const SKILLS = [HTML, CSS, JS, REACT, TWIND, GIT, SCSS];

const sections = document.querySelectorAll("section");
const nav = document.querySelectorAll("header nav a");
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const projectsContainer = document.querySelector("[data-projects-container]");
const projectsTemplate = document.querySelector("#projects-template");
const cardTemplate = document.querySelector("[data-skills-cards]");
const cardContainer = document.querySelector("[data-card-container]");
const submitBtn = document.getElementById("submitBtn");
const contactName = document.getElementById("contactName");
const contactEmail = document.getElementById("contactEmail");
const contactMessage = document.getElementById("contactMessage");
const form = document.querySelector("#form");

window.onbeforeunload = () => {
  form.reset();
};

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");

  navbar.querySelectorAll(".nav-link").forEach((item) => {
    item.classList.toggle("slide-in");
  });
});

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      nav.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// TYPED JS
const typed = new Typed(".multiple-text", {
  strings: ["Front-end Developer"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

// Render Projects

function renderProjects() {
  projectsData.forEach((data) => {
    const projectItem = projectsTemplate.content.cloneNode(true);

    const projectsBox = projectItem.querySelector("[data-projects-box]");
    projectsBox.setAttribute("id", `item-${data.id}`);

    const projectImg = projectItem.querySelector("[data-projects-img]");
    projectImg.src = data.img;

    const projectTitle = projectItem.querySelector("[data-project-title]");
    projectTitle.innerText = data.name;

    const projectText = projectItem.querySelector("[data-project-text]");
    projectText.innerText = data.title;

    const projectLink = projectItem.querySelector("[data-project-link]");
    projectLink.href = data.demoLink;
    projectLink.target = "_blank";

    const projectSource = projectItem.querySelector("[data-github-link]");
    projectSource.href = data.gitLink;
    projectSource.target = "_blank";
    projectsContainer.appendChild(projectItem);
  });
}
renderProjects();

// Render Skills Cards
function renderSkillsCards() {
  SKILLS.forEach((img, i) => {
    const cardItem = cardTemplate.content.cloneNode(true);

    const card = cardItem.querySelector("[data-card]");

    const cardImg = cardItem.querySelector("[data-card-img]");
    cardImg.src = img;
    card.setAttribute("id", `skills-${i}`);

    cardContainer.appendChild(card);
  });
}
renderSkillsCards();

// Form Validation

let nameInput = "";
let emailInput = "";
let messageInput = "";

contactName.addEventListener("input", (e) => {
  nameInput = e.target.value;
});

contactEmail.addEventListener("input", (e) => {
  emailInput = e.target.value;
});

contactMessage.addEventListener("input", (e) => {
  messageInput = e.target.value;
});

function validateForm() {
  let isValid = true;

  if (!nameInput && !emailInput && !messageInput) {
    contactName.classList.add("invalid");
    contactEmail.classList.add("invalid");
    contactMessage.classList.add("invalid");
    isValid = false;
  }

  if (nameInput === "" || !/^[a-zA-Z-' ]+$/.test(nameInput)) {
    contactName.classList.add("invalid");
    isValid = false;
  }

  if (emailInput === "" || !/\S+@\S+\.\S+/.test(emailInput)) {
    contactEmail.classList.add("invalid");
    isValid = false;
  }

  if (messageInput === "") {
    contactMessage.classList.add("invalid");
    isValid = false;
  }

  return isValid;
}

submitBtn.addEventListener("click", (e) => {
  console.log("messageInput -->", messageInput);
  if (!validateForm()) {
    e.preventDefault();
    setTimeout(() => {
      contactName.classList.remove("invalid");
      contactEmail.classList.remove("invalid");
      contactMessage.classList.remove("invalid");
    }, 1200);
  }
});

//  ------------- SCROLL REVEAL ------------ \\
ScrollReveal({
  reset: true,
  distance: "150px",
  duration: 1000,
  delay: 100,
});

ScrollReveal().reveal(".heading, #skills-1, #skills-3, #item-2, .board", {
  origin: "top",
});
ScrollReveal().reveal(
  ".services-container, .contact form, #item-5, #skills-2, #skills-4, #skills-6, #contactMessage, .social-media, .scroll-reveal-div, .about-content p",
  { origin: "bottom" },
);
ScrollReveal().reveal(
  ".home-content h1, .home-content p, #item-1, #item-4, #item-7, #skills-0, #contactName, .linkedIn, .about-content h3",
  { origin: "left" },
);
ScrollReveal().reveal(
  ".about-content .heading, #item-3, #item-6, #skills-5, #contactEmail, .more-on, #item-6, .home-content h3, .main-git",
  { origin: "right" },
);
