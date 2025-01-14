emailjs.init("u7sWoQ1sfpfBdV2B1");
const serviceID = "service_7clceog";
const templateID = "template_bb48tzs";

// Toast notification logic
function showToast(message, isSuccess = true) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  // Add success or error styling
  if (isSuccess) {
    toast.style.backgroundColor = "#000000cc";
  } else {
    toast.style.backgroundColor = "#000000cc";
  }

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// Contact form logic
const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get form inputs
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Get the current language
  const currentLang = document.documentElement.lang;

  // Check if all fields are filled
  if (name && email && message) {
    // Change button text to "Sending..." based on the current language
    submitBtn.textContent = translator.translations[currentLang].sendingButton;
    submitBtn.disabled = true; // Disable the button to prevent multiple submissions

    // Log the parameters for debugging
    console.log({
      from_name: name,
      email_id: email,
      message: message,
      to_name: "Soufiane",
    });

    // Send email using EmailJS
    emailjs
      .send(serviceID, templateID, {
        from_name: name,
        email_id: email,
        message: message,
        to_name: "Soufiane",
      })
      .then(
        (response) => {
          // Show success toast
          showToast(translator.translations[currentLang].thankYouMessage, true);
          form.reset(); // Reset the form after successful submission
        },
        (error) => {
          // Show error toast
          showToast(translator.translations[currentLang].errorMessage, false);
        }
      )
      .finally(() => {
        // Reset button text and enable it after submission
        submitBtn.textContent =
          translator.translations[currentLang].submitButton;
        submitBtn.disabled = false;
      });
  } else {
    // If any field is empty, show an error toast
    showToast(translator.translations[currentLang].fillAllFieldsMessage, false);
  }
});
