// const display = document.getElementById("display");
// const sceinCal_display = document.querySelector("#scien-cal");
// const simCal_display = document.querySelector("#simple_calc");
// let currentInput = '';
// let expression = '';
// let isScientific = false;
// let radian = true;

// // Hide scientific calculator by default
// sceinCal_display.style.display = "none";
// simCal_display.style.display = "block";

// function appendToDisplay(value) {
//   if (display.value === '0' || expression === display.value) {
//     display.value = value;
//   } else {
//     display.value += value;
//   }
//   currentInput += value;
// }

// function calculate_simple(){
//   try {
//     display.value = eval(display.value);
//   } catch (e) {
//     display.value = 'Error';
//   }
// }

// // Toggle between scientific and simple calculator
// document.querySelector(".num").addEventListener("click", () => {
//   sceinCal_display.style.display = "none";
//   simCal_display.style.display = "block";
//   isScientific = false;
// });

// document.querySelector(".func").addEventListener("click", () => {
//   sceinCal_display.style.display = "block";
//   simCal_display.style.display = "none";
//   isScientific = true;
// });

// // Add event listeners for calculator buttons
// document.querySelector("#simple_calc").addEventListener("click", (e) => {
//   const value = e.target.innerText;
//   switch (value) {
//     case 'AC':
//       display.value = '0';
//       currentInput = '';
//       expression = '';
//       break;
//     case '=':
//       calculate_simple();
//       break;
//     default:
//       appendToDisplay(value);
//       break;
//   }
// });

const display = document.getElementById("display");
const sceinCal_display = document.querySelector("#scien-cal");
const simCal_display = document.querySelector("#simple_calc");
let currentInput = "";
let expression = "";
let isScientific = false;
let calculateSimple = true;
let radian = true;

// Hide scientific calculator by default
sceinCal_display.style.display = "none";
simCal_display.style.display = "block";

function appendToDisplay(value) {
  if (display.value === "0" || expression === display.value) {
    display.value = value;
  } else {
    display.value += value;
  }

  currentInput += value;
}

function calculate_simple() {
  try {
    let expression = display.value.replace(/×/g, "*").replace(/÷/g, "/");
    console.log(expression);
    display.value = eval(expression);
  } catch (e) {
    display.value = "Error";
  }
}

function factorial(n) {
  return n != 1 ? n * factorial(n - 1) : 1;
}

function appendFunctionToDisplay(func) {
  if (display.value === "0") {
    display.value = `${func}(`;
    currentInput += `${func}(`;
    return;
  }
  display.value += `${func}(`;
  currentInput += `${func}(`;
}

function calculate_expression(expression) {
  try {
    const func = new Function(`return ${expression}`);
    let result = func();
    // Define a small tolerance value
    const tolerance = 1e-10;
    // Check if the result is close to zero
    if (Math.abs(result) < tolerance) {
      result = 0;
    }
    return result;
  } catch (e) {
    return "Error";
  }
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function replaceTrigFunctions(expr) {
  if (radian) {
    return expr;
  }
  return expr
    .replace(/Math\.sin\(([^)]+)\)/g, "Math.sin(toRadians($1))")
    .replace(/Math\.cos\(([^)]+)\)/g, "Math.cos(toRadians($1))")
    .replace(/Math\.tan\(([^)]+)\)/g, "Math.tan(toRadians($1))");
}
function calculate() {
  if (calculateSimple) {
    calculate_simple();
  } else {
    calculate_scientific();
  }
}

function calculate_scientific() {
  try {
    expression = display.value
      .replace(/(\d+)(π)/g, "$1 * $2")
      .replace(/log\(/g, "Math.log10(")
      .replace(/sin\(/g, "Math.sin(")
      .replace(/cos\(/g, "Math.cos(")
      .replace(/tan\(/g, "Math.tan(")

      .replace(/ln\(/g, "Math.log(")
      .replace(/\^/g, "**")
      .replace(/sqrt\(/g, "Math.sqrt(")
      .replace(/π/g, Math.PI)
      .replace(/×/g, "*")
      .replace(/÷/g, "/");

    expression = replaceTrigFunctions(expression);
    console.log(expression);
    display.value = calculate_expression(expression);
  } catch (e) {
    display.value = "Error";
  }
}

function backSpace() {
  display.value = display.value.slice(0, display.value.length - 1);
}

// Toggle between scientific and simple calculator
document.querySelector(".num").addEventListener("click", () => {
  sceinCal_display.style.display = "none";
  simCal_display.style.display = "block";
  isScientific = false;
});

document.querySelector(".func").addEventListener("click", () => {
  sceinCal_display.style.display = "block";
  simCal_display.style.display = "none";
  isScientific = true;
});

// Add event listeners for simple calculator buttons
document.querySelector("#simple_calc").addEventListener("click", (e) => {
  const value = e.target.innerText;
  switch (value) {
    case "AC":
      display.value = "0";
      currentInput = "";
      expression = "";
      calculateSimple = true;
      break;
    case "%":
      percent();
    case "=":
      calculate();
      break;

    default:
      appendToDisplay(value);
      break;
  }
});
const radButton = document.querySelector(".scie-btn.rad");
const degButton = document.querySelector(".scie-btn.deg");

function highlightModeButton() {
  if (radian) {
    radButton.classList.add("active-mode");
    degButton.classList.remove("active-mode");
  } else {
    radButton.classList.remove("active-mode");
    degButton.classList.add("active-mode");
  }
}
document.querySelector(".backspace").addEventListener("click", backSpace);
// Add event listeners for scientific calculator buttons
document.querySelector("#scien-cal").addEventListener("click", (e) => {
  calculateSimple = false;
  const value = e.target.innerText;
  console.log(value);
  switch (value) {
    case "Rad":
      radian = true;
      highlightModeButton();
      break;
    case "Deg":
      radian = false;
      highlightModeButton();
      break;

      break;
    case "x!":
      display.value = factorial(parseFloat(currentInput));
      currentInput = display.value;
      break;
    case "sin":
    case "cos":
    case "tan":
    case "log":
    case "ln":
    case "sqrt":
      appendFunctionToDisplay(value);
      break;
    case "π":
      appendToDisplay("π");
      break;
    case "Exp":
      display.value = Math.exp(display.value);

      break;
    case "X^Y":
      appendToDisplay("^");
      break;

    default:
      appendToDisplay(value);
      break;
  }
});
function percent() {
  display.value = display.value / 100;
}
