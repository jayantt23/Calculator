const numbers = document.querySelectorAll(".numbers");
const display = document.querySelector(".display");
const AC = document.querySelector("#AC");
const decimal = document.querySelector("#decimal");
const operations = document.querySelectorAll(".operations");
const equals = document.querySelector("#equals");

let firstNumber = undefined;
let secondNumber = undefined;
let operator = undefined;

let isDisplayReplace = true;
let isOperatorSelected = false;
let isFirstNumDefined = false;

function displayAll() {
  console.table(
    firstNumber,
    secondNumber,
    operator,
    isDisplayReplace,
    isOperatorSelected,
    isFirstNumDefined
  );
}

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

function round(a) {
  return Math.round(a * 100) / 100;
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
      if (isDisplayReplace) {
        display.textContent = number.textContent;
        if (number.textContent != "0") isDisplayReplace = false;
        if (isOperatorSelected) operator.classList.remove("selected");
      } else {
        display.textContent += number.textContent;
      }
    }
  });
});

decimal.addEventListener("click", () => {
  if (display.textContent.length < 9 && !display.textContent.includes(".")) {
    display.textContent += ".";
  }
});

AC.addEventListener("click", () => {
  display.textContent = "0";
  firstNumber = undefined;
  secondNumber = undefined;
  if (isOperatorSelected) operator.classList.remove("selected");
  operator = undefined;
  isOperatorSelected = false;
  isDisplayReplace = true;
});

operations.forEach((operation) => {
  operation.addEventListener("click", () => {
    if (!isOperatorSelected) {
      if (!isFirstNumDefined) firstNumber = Number(display.textContent);
      operation.classList.add("selected");
      operator = operation;
      isOperatorSelected = true;
      isDisplayReplace = true;
      isFirstNumDefined = true;
    } else {
      if (operator == operation) {
        firstNumber = undefined;
        operator.classList.remove("selected");
        operator = undefined;
        isOperatorSelected = false;
        isDisplayReplace = false;
        isFirstNumDefined = false;
      } else {
        operator.classList.remove("selected");
        operation.classList.add("selected");
        operator = operation;
        isOperatorSelected = true;
        isDisplayReplace = true;
      }
    }
  });
});

equals.addEventListener("click", () => {
  if (isFirstNumDefined && isOperatorSelected) {
    secondNumber = Number(display.textContent);
    display.textContent = round(
      operate(firstNumber, secondNumber, operator.textContent)
    );
    isDisplayReplace = true;
    isFirstNumDefined = false;
    isOperatorSelected = false;
    firstNumber = undefined;
    secondNumber = undefined;
    operator = undefined;
  }
});
