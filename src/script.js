
const firstInput = document.getElementById("first-number");
const secondInput = document.getElementById("second-number");
const resultOutput = document.getElementById("result");
const errorMessage = document.getElementById("error");

const addButton = document.getElementById("add");
const subtractButton = document.getElementById("subtract");
const multiplyButton = document.getElementById("multiply");
const divideButton = document.getElementById("divide");

const clearAllButton = document.getElementById("clear-all");
const clearFieldButton = document.getElementById("clear-field");
const backspaceButton = document.getElementById("backspace");
const decimalButton = document.getElementById("decimal");
const negateButton = document.getElementById("negate");

const digitButtons = document.querySelectorAll("[data-value]");

let activeInput = firstInput;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function roundResult(value) {
  if (Number.isInteger(value)) {
    return value;
  }
  return Math.round(value * 100) / 100;
}

function parseNumber(text) {
  const clean = text.trim().replace(",", ".");

  if (clean === "") {
    return null;
  }

  const number = Number(clean);

  if (!Number.isFinite(number)) {
    return null;
  }

  return number;
}

function showError(message) {
  resultOutput.textContent = "—";
  errorMessage.textContent = message;
  errorMessage.hidden = false;
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.hidden = true;
  firstInput.classList.remove("is-invalid");
  secondInput.classList.remove("is-invalid");
}

function calculate(operation) {
  clearError();

  const a = parseNumber(firstInput.value);
  const b = parseNumber(secondInput.value);

  if (a === null || b === null) {
    if (a === null) firstInput.classList.add("is-invalid");
    if (b === null) secondInput.classList.add("is-invalid");
    showError("Введено неправильні дані. Заповніть обидва поля числами.");
    return;
  }

  if (operation === divide && b === 0) {
    secondInput.classList.add("is-invalid");
    showError("Ділити на нуль не можна.");
    return;
  }

  resultOutput.textContent = String(roundResult(operation(a, b))).replace(".", ",");
}


function setActiveInput(input) {
  activeInput = input;
  firstInput.classList.toggle("is-active", input === firstInput);
  secondInput.classList.toggle("is-active", input === secondInput);
}

firstInput.addEventListener("focus", () => setActiveInput(firstInput));
secondInput.addEventListener("focus", () => setActiveInput(secondInput));

firstInput.addEventListener("input", clearError);
secondInput.addEventListener("input", clearError);

function addDigit(digit) {
  clearError();

  if (activeInput.value === "0") {
    activeInput.value = digit;
  } else if (activeInput.value === "-0") {
    activeInput.value = "-" + digit;
  } else {
    activeInput.value += digit;
  }
}

function addDecimal() {
  clearError();

  const value = activeInput.value;

  if (value.includes(",") || value.includes(".")) {
    return;
  }

  activeInput.value = value === "" || value === "-" ? value + "0," : value + ",";
}

function negate() {
  clearError();

  const value = activeInput.value;
  activeInput.value = value.startsWith("-") ? value.slice(1) : "-" + value;
}

function backspace() {
  clearError();
  activeInput.value = activeInput.value.slice(0, -1);
}

function clearField() {
  clearError();
  activeInput.value = "";
}

function clearAll() {
  clearError();
  firstInput.value = "";
  secondInput.value = "";
  resultOutput.textContent = "—";
  setActiveInput(firstInput);
}

digitButtons.forEach((button) => {
  if (button.dataset.value !== undefined) {
    button.addEventListener("click", () => addDigit(button.dataset.value));
  }
});

decimalButton.addEventListener("click", addDecimal);
negateButton.addEventListener("click", negate);
backspaceButton.addEventListener("click", backspace);
clearFieldButton.addEventListener("click", clearField);
clearAllButton.addEventListener("click", clearAll);

addButton.addEventListener("click", () => calculate(add));
subtractButton.addEventListener("click", () => calculate(subtract));
multiplyButton.addEventListener("click", () => calculate(multiply));
divideButton.addEventListener("click", () => calculate(divide));

setActiveInput(firstInput);
