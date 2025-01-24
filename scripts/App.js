import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.2/index.js";

// Hero section animations
gsap.to("#heroTitle", {
  opacity: 1,
  y: -10,
  duration: 1.5,
  ease: "power2.out",
});
gsap.to("#heroSubtitle", {
  opacity: 1,
  y: -10,
  duration: 1.5,
  ease: "power2.out",
  delay: 1,
});

document.addEventListener("DOMContentLoaded", () => {
  const footerYear = document.querySelector(".text-gray-400");
  const currentYear = new Date().getFullYear();
  footerYear.innerHTML = footerYear.innerHTML.replace(/\d{4}/, currentYear);
});

// Display "Scroll for More" after seconds
setTimeout(() => {
  const scrollText = document.querySelector(".scroll-text-container");
  scrollText.style.visibility = "visible";
}, 7000);

// Smooth scroll to About section
const scrollForMore = document.getElementById("scrollForMore");
scrollForMore.addEventListener("click", () => {
  document.getElementById("about").scrollIntoView({ behavior: "smooth" });
});

// Random image animation logic
const imgs = document.getElementsByClassName("imgrandom");
var i = 0;
var intervalId = window.setInterval(function () {
  imgs[i].style.opacity = "0";
  var options = [];
  for (let index = 0; index < imgs.length; index++) {
    index != i && options.push(i);
  }
  i = Math.floor(Math.random() * options.length);
  imgs[i].style.opacity = "1";
}, 3000);

// Language dropdown logic
function toggleDropdown(event) {
  event.stopPropagation();
  const dropdown = document.querySelector(".language-selector .dropdown");
  dropdown.classList.toggle("show");

  const languageLinks = dropdown.querySelectorAll("a");
  if (languageLinks.length > 5) {
    dropdown.style.maxHeight = "200px";
    dropdown.style.overflowY = "auto";
  } else {
    dropdown.style.maxHeight = "none";
    dropdown.style.overflowY = "hidden";
  }
}

const languageIconButton = document.querySelector(".language-icon button");
languageIconButton.addEventListener("click", toggleDropdown);

document.addEventListener("click", function (event) {
  const dropdown = document.querySelector(".language-selector .dropdown");
  const languageIcon = document.querySelector(".language-icon");

  if (
    !dropdown.contains(event.target) &&
    !languageIcon.contains(event.target)
  ) {
    dropdown.classList.remove("show");
  }
});

const languageLinks = document.querySelectorAll(
  ".language-selector .dropdown a"
);
languageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const dropdown = document.querySelector(".language-selector .dropdown");
    dropdown.classList.remove("show");

    const selectedLanguage = link.getAttribute("data-lang");
    console.log("Selected Language:", selectedLanguage);
  });
});

