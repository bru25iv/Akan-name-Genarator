const malenames = [
  "Kwasi",
  "Kwadwo",
  "Kwabena",
  "Kwaku",
  "Yaw",
  "Kofi",
  "Kwame",
];

const femalenames = [
  "Akosua",
  "Adwoa",
  "Abenaa",
  "Akua",
  "Yaa",
  "Afua",
  "Ama",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const form = document.getElementById("akan-form");
const resultEl = document.getElementById("result");
const akanNameText = document.getElementById("akan-name-text");
const resetButton = document.getElementById("reset-button");

function calculateWeekdayIndex(year, month, day) {
  const CC = Math.floor(year / 100);
  const YY = year % 100;
  const d = ((4 * CC - 2 * CC - 1) + 45 * YY + 1026 * (month + 1) + day) % 7;
  return ((d % 7) + 7) % 7;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const birthdateValue = document.getElementById("birthdate").value;
  const genderValue = document.getElementById("gender").value.toLowerCase();

  if (!birthdateValue) {
    resultEl.textContent = "Please enter your date of birth.";
    akanNameText.textContent = "Your Akan name will appear here after submission.";
    return;
  }

  const [year, month, day] = birthdateValue.split("-").map(Number);

  if (day < 1 || day > 31) {
    resultEl.textContent = "Please enter a valid day between 1 and 31.";
    akanNameText.textContent = "";
    return;
  }

  if (month < 1 || month > 12) {
    resultEl.textContent = "Please enter a valid month between 1 and 12.";
    akanNameText.textContent = "";
    return;
  }

  if (genderValue !== "male" && genderValue !== "female") {
    resultEl.textContent = "Please select a valid gender.";
    akanNameText.textContent = "";
    return;
  }

  const birthDate = new Date(year, month - 1, day);
  if (Number.isNaN(birthDate.getTime())) {
    resultEl.textContent = "Please enter a valid date.";
    akanNameText.textContent = "";
    return;
  }

  const dayIndex = calculateWeekdayIndex(year, month, day);
  const akanDay = days[dayIndex];
  const akanName = genderValue === "male" ? malenames[dayIndex] : femalenames[dayIndex];

  resultEl.innerHTML = `You were born on <strong>${akanDay}</strong>.`;
  akanNameText.innerHTML = `Your Akan name is <strong>${akanName}</strong>.`;
});

resetButton.addEventListener("click", function () {
  resultEl.textContent = "";
  akanNameText.textContent = "Your Akan name will appear here after submission.";
});

