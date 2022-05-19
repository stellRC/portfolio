const btns = document.querySelector('.container__btns');
const display = document.querySelector('.display--screen')


// DISPLAY 

const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputNumber(btnNumber) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = btnNumber;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue = displayValue === '0' ? btnNumber : displayValue + btnNumber;
  }
}

function inputDecimal(dot) {
  if(calculator.waitingForSecondOperand === true) {
    calculator.displayValue = '0.'
    calculator.waitingForSecondOperand = false;
    return;
  }
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function pressOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue); 

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }
  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator)
}

function calculate (firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand
  } else if (operator === '-') {
    return firstOperand - secondOperand 
  } else if (operator === "*") {
    return firstOperand * secondOperand 
  } else if (operator === '/') {
    return firstOperand / secondOperand 
  } else if (operator === 'ⁿ'){
  return Math.pow(firstOperand, secondOperand)
} else if (operator === 'n!')  {
  function factorial(firstOperand) {
    let answer = 1;
    if (firstOperand === 0 || firstOperand === 1 ) {
        return answer;
    } else {
        for (let i = firstOperand; i >= 1; i--) {
            answer = answer * 1;
        }
        return answer;
      }
    }
    answer = factorial(firstOperand);
  }
}
  return secondOperand;


function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}

function updateDisplay() {
  display.value = calculator.displayValue;
}

updateDisplay();



// Click-Event

btns.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }
  if (target.classList.contains('btn--operator')) {
    pressOperator(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains('btn--decimal')) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains('btn--all-clear')) {
    resetCalculator();
    updateDisplay();
    return;
  }
  inputNumber(target.value);
  updateDisplay();
})


