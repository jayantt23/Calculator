const numbers = document.querySelectorAll(".numbers");
const display = document.querySelector(".display");
const AC = document.querySelector("#AC");
const decimal = document.querySelector("#decimal");

let firstNumber = undefined;
let secondNumber = undefined;
let operator = "";
let hasNotDecimal = true;

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
  return Math.round((a / b) * 100) / 100;
}

function operate(firstNumber, secondNumber, operator) {
  if (operator == "/") return divide(firstNumber, secondNumber);
  else if (operator == "*") return multiply(firstNumber, secondNumber);
  else if (operator == "-") return subtract(firstNumber, secondNumber);
  else if (operator == "+") return add(firstNumber, secondNumber);
}

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (display.textContent.length < 9) {
      if (display.textContent == "0") {
        display.textContent = number.textContent;
      } else {
        display.textContent += number.textContent;
      }
    }
  });
});

decimal.addEventListener("click", () => {
  if (display.textContent.length < 9 && hasNotDecimal) {
    display.textContent += ".";
    hasNotDecimal = false;
  }
});

AC.addEventListener("click", () => {
  display.textContent = "0";
  firstNumber = NaN;
  secondNumber = NaN;
  operator = "";
  hasNotDecimal = true;
});
