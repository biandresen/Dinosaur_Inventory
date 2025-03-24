//* LIGHT/DARK-MODE
const themeToggle = document.getElementById("themeToggle");

// Check for saved theme preference
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
}

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  themeToggle.textContent =
    themeToggle.textContent === "Light" ? "Dark" : "Light";

  // Save preference to localStorage
  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});

//* DINO DETAILS PAGE (authentification)
const dataSection = document.querySelector(".dino-details-page__data-section");
const editDinoButton = document.querySelector(".edit-dino-button");
const editFormSection = document.getElementById("editFormSection");
const cancelEditButton = document.getElementById("cancelEdit");
const passwordForm = document.querySelector(".password-form-wrapper");
const wrongPasswordMessage = document.querySelector(".wrong-password-message");
const passwordInput = document.querySelector(".password-input");
const confirmPasswordButton = document.querySelector(
  ".confirm-password-button"
);

function togglePasswordInput() {
  passwordForm.style.display =
    passwordForm.style.display === "none" ? "block" : "none";
  wrongPasswordMessage.style.display = "none"; // Hide error message if previously shown
  passwordInput.value = "";
}

function showEditForm() {
  dataSection.style.display = "none";
  editDinoButton.style.display = "none";
  editFormSection.style.display = "block";
}

function hideEditForm() {
  editFormSection.style.display = "none";
  dataSection.style.display = "block";
  editDinoButton.style.display = "flex";
}

async function handleAuth(event) {
  event.preventDefault();

  const enteredPassword = passwordInput.value;

  const response = await fetch("/auth/check-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: enteredPassword }),
  });

  const result = await response.json();
  console.log(result.authenticated);

  if (result.authenticated) {
    showEditForm();
    console.log("Access granted");
  } else {
    wrongPasswordMessage.style.display = "block";
    console.log("Access denied");
  }
}

editDinoButton.addEventListener("click", togglePasswordInput);
cancelEditButton.addEventListener("click", () => {
  hideEditForm();
  togglePasswordInput();
});
confirmPasswordButton.addEventListener("click", handleAuth);
