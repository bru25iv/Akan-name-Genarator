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

  const birthdateInput = document.getElementById("birthdate");
  const genderInput = document.getElementById("gender");
  const birthdateValue = birthdateInput.value;
  const genderValue = genderInput.value.toLowerCase();

  if (!birthdateValue) {
    window.alert("Please enter your date of birth.");
    birthdateInput.focus();
    resultEl.textContent = "";
    akanNameText.textContent = "Your Akan name will appear here after submission.";
    return;
  }

  const dateParts = birthdateValue.split("-");

  if (dateParts.length !== 3 || !/^\d{4}$/.test(dateParts[0]) || !/^\d{2}$/.test(dateParts[1]) || !/^\d{2}$/.test(dateParts[2])) {
    window.alert("Please enter a valid date in YYYY-MM-DD format.");
    return;
  }

  const [year, month, day] = dateParts.map(Number);

  if (day < 1 || day > 31) {
    window.alert("Please enter a valid day between 1 and 31.");
    return;
  }

  if (month < 1 || month > 12) {
    window.alert("Please enter a valid month between 1 and 12.");
    return;
  }

  if (!genderValue) {
    window.alert("Please select your gender.");
    genderInput.focus();
    return;
  }

  if (genderValue !== "male" && genderValue !== "female") {
    window.alert("Please select a valid gender.");
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
  resultEl.textContent = "";
  akanNameText.textContent = "Your Akan name will appear here after submission.";
});

