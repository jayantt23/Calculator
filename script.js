const numbers = document.querySelectorAll(".numbers");
const display = document.querySelector(".display");
const AC = document.querySelector("#AC");
const decimal = document.querySelector("#decimal");

let firstNumber;
let secondNumber;
let operator;

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
