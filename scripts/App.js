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

// Update copyright
document.addEventListener("DOMContentLoaded", () => {
  const footerYear = document.querySelector(".text-gray-400");
  const currentYear = new Date().getFullYear();
  footerYear.innerHTML = footerYear.innerHTML.replace(/\d{4}/, currentYear);
});



// Display "Scroll for More" after 3 seconds
setTimeout(() => {
  const scrollText = document.querySelector(".scroll-text-container");
  scrollText.style.visibility = "visible";
}, 7000);

// Smooth scroll to About section
const scrollForMore = document.getElementById("scrollForMore");
scrollForMore.addEventListener("click", () => {
  document.getElementById("about").scrollIntoView({ behavior: "smooth" });
});

// Contact form logic
const form = document.getElementById("contact-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Thank you for reaching out! I'll get back to you soon.");
  form.reset();
});

const certificatesContainer = document.getElementById("certificates-container");

const imgs = document.getElementsByClassName("imgrandom");
var i = 0;
var intervalId = window.setInterval(function () {
  imgs[i].style.opacity = "0";
  var options = [];
  for (let index = 0; index < imgs.length; index++) {
    index != i && options.push(i);
  }
  // ->
  // i += 1;

  i = Math.floor(Math.random() * options.length);
  imgs[i].style.opacity = "1";
}, 3000);
// clearInterval(intervalId);
console.log(imgs);

// Function to toggle the dropdown visibility
function toggleDropdown(event) {
  event.stopPropagation(); // Prevent event from bubbling up to document
  const dropdown = document.querySelector(".language-selector .dropdown");
  dropdown.classList.toggle("show");

  // Adjust scrollbar properties dynamically if needed
  const languageLinks = dropdown.querySelectorAll("a");
  if (languageLinks.length > 5) {
    dropdown.style.maxHeight = "200px"; // Set max height for scrollbar
    dropdown.style.overflowY = "auto"; // Enable vertical scrolling
  } else {
    dropdown.style.maxHeight = "none"; // Reset if less than 5 languages
    dropdown.style.overflowY = "hidden";
  }
}

// Add click event listener to the language icon button
const languageIconButton = document.querySelector(".language-icon button");
languageIconButton.addEventListener("click", toggleDropdown);

// Close the dropdown if the user clicks outside of it
document.addEventListener("click", function (event) {
  const dropdown = document.querySelector(".language-selector .dropdown");
  const languageIcon = document.querySelector(".language-icon");

  // Check if the click is outside the dropdown and language icon
  if (
    !dropdown.contains(event.target) &&
    !languageIcon.contains(event.target)
  ) {
    dropdown.classList.remove("show"); // Close the dropdown
  }
});

// Close dropdown when a language is selected
const languageLinks = document.querySelectorAll(
  ".language-selector .dropdown a"
);
languageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    const dropdown = document.querySelector(".language-selector .dropdown");
    dropdown.classList.remove("show"); // Close the dropdown

    // Optional: Handle language selection
    const selectedLanguage = link.getAttribute("data-lang");
    console.log("Selected Language:", selectedLanguage);
  });
});

