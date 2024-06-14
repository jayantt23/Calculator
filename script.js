const numbers = document.querySelectorAll(".numbers");
const display = document.querySelector(".display");
const AC = document.querySelector("#AC");
const decimal = document.querySelector("#decimal");
const operations = document.querySelectorAll(".operations");
const equals = document.querySelector("#equals");
const sign = document.querySelector("#sign");
const percentage = document.querySelector("#percentage");

const clickEvent = new Event("click");

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
  str = "" + Math.floor(a);
  let decimalPlaces = 1;
  for (let i = 0; i < 8 - str.length; i++) decimalPlaces *= 10;
  return Math.round(a * decimalPlaces) / decimalPlaces;
}

function operate(firstNumber, secondNumber, operator) {
  if (operator == "/") return divide(firstNumber, secondNumber);
  else if (operator == "*") return multiply(firstNumber, secondNumber);
  else if (operator == "-") return subtract(firstNumber, secondNumber);
  else if (operator == "+") return add(firstNumber, secondNumber);
}

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (isDisplayReplace) {
      display.textContent = number.textContent;
      if (number.textContent != "0") isDisplayReplace = false;
      if (isOperatorSelected) operator.classList.remove("selected");
    } else if (display.textContent.length < 9) {
      display.textContent += number.textContent;
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key in ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]) {
    if (isDisplayReplace) {
      display.textContent = e.key;
      if (e.key != "0") isDisplayReplace = false;
      if (isOperatorSelected) operator.classList.remove("selected");
    } else if (display.textContent.length < 9) {
      display.textContent += e.key;
    }
  } else if (e.key == "=") {
    equals.dispatchEvent(clickEvent);
  } else if (e.key == ".") {
    decimal.dispatchEvent(clickEvent);
  } else if (e.key == "Backspace") {
    AC.dispatchEvent(clickEvent);
  } else if (e.key == "/") {
    operations[0].dispatchEvent(clickEvent);
  } else if (e.key == "*") {
    operations[1].dispatchEvent(clickEvent);
  } else if (e.key == "-") {
    operations[2].dispatchEvent(clickEvent);
  } else if (e.key == "+") {
    operations[3].dispatchEvent(clickEvent);
  } else if (e.key == "%") {
    percentage.dispatchEvent(clickEvent);
  }
});

decimal.addEventListener("click", () => {
  if (display.textContent.length < 9 && !display.textContent.includes(".")) {
    display.textContent += ".";
    isDisplayReplace = false;
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
      if (operator == operation && isDisplayReplace) {
        firstNumber = undefined;
        operator.classList.remove("selected");
        operator = undefined;
        isOperatorSelected = false;
        isDisplayReplace = false;
        isFirstNumDefined = false;
      } else if (!isDisplayReplace) {
        equals.dispatchEvent(new Event("click"));
        if (!isFirstNumDefined) firstNumber = Number(display.textContent);
        operation.classList.add("selected");
        operator = operation;
        isOperatorSelected = true;
        isDisplayReplace = true;
        isFirstNumDefined = true;
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
  secondNumber = Number(display.textContent);
  if (isFirstNumDefined && isOperatorSelected && secondNumber != undefined) {
    display.textContent = round(
      operate(firstNumber, secondNumber, operator.textContent)
    );
    isDisplayReplace = true;
    isFirstNumDefined = false;
    isOperatorSelected = false;
    firstNumber = undefined;
    secondNumber = undefined;
    operator.classList.remove("selected");
    operator = undefined;
  }
});

sign.addEventListener("click", () => {
  display.textContent = Number(display.textContent) * -1;
});

percentage.addEventListener("click", () => {
  display.textContent = round(Number(display.textContent) / 100);
});
