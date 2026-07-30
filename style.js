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

  const dayInput = document.getElementById("birth-day");
  const monthInput = document.getElementById("birth-month");
  const yearInput = document.getElementById("birth-year");
  const genderInput = document.getElementById("gender");
  const genderValue = genderInput.value.toLowerCase();

  const day = Number(dayInput.value);
  const month = Number(monthInput.value);
  const year = Number(yearInput.value);

  let missingField = null;
  let missingMessage = "";

  if (!dayInput.value) {
    missingField = dayInput;
    missingMessage = "Please enter your day of birth.";
  } else if (!monthInput.value) {
    missingField = monthInput;
    missingMessage = "Please enter your month of birth.";
  } else if (!yearInput.value) {
    missingField = yearInput;
    missingMessage = "Please enter your year of birth.";
  }

  if (missingField) {
    window.alert(missingMessage);
    missingField.focus();
    resultEl.textContent = "";
    akanNameText.textContent = "Your Akan name will appear here after submission.";
    return;
  }

  if (day < 1 || day > 31) {
    window.alert("Please enter a valid day between 1 and 31.");
    dayInput.focus();
    return;
  }

  if (month < 1 || month > 12) {
    window.alert("Please enter a valid month between 1 and 12.");
    monthInput.focus();
    return;
  }

  if (!genderValue) {
    window.alert("Please select your gender.");
    resultEl.textContent = "";
    akanNameText.textContent = "Your Akan name will appear here after submission.";
    genderInput.focus();
    return;
  }

  if (genderValue !== "male" && genderValue !== "female") {
    resultEl.textContent = "Please select a valid gender.";
    akanNameText.textContent = "";
    genderInput.focus();
    return;
  }

  const birthDate = new Date(year, month - 1, day);
  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day
  ) {
    window.alert("Please enter a valid date.");
    return;
  }

  const dayIndex = calculateWeekdayIndex(year, month, day);
  const akanDay = days[dayIndex];
  const akanName = genderValue === "male" ? malenames[dayIndex] : femalenames[dayIndex];

  resultEl.innerHTML = `You were born on <strong>${akanDay}</strong>.`;
  akanNameText.innerHTML = `Your Akan name is <strong>${akanName}</strong>.`;
});

resetButton.addEventListener("click", function () {
  form.reset();
  resultEl.textContent = "";
  akanNameText.textContent = "Your Akan name will appear here after submission.";
});

