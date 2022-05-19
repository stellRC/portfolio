const btns = document.querySelector('.container__btns');
const display = document.querySelector('.display--screen')


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
      const result = operate(firstOperand, inputValue, operator);
  
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
    }
    // change
    // calculator.f += operator;
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
  }

// operation
function operate(firstOperand, secondOperand, operator) {
    if (operator === "+") {
        return add(firstOperand, secondOperand)
    }
    if (operator === "-") {
        return subtract(firstOperand, secondOperand)
    }
    if (operator === "*") {
       return multiply(firstOperand, secondOperand)
    }
    if (operator === "/") {
        return divide(firstOperand, secondOperand)
    }
    if (operator === "^n") {
       return  power(firstOperand, secondOperand)
    }
    if (operator === "n!") {
        return  factorial(secondOperand)
    }
}

// Factorial
function factorial(firstOperand) {
    let answer = 1;
    for (let i = firstOperand; i >= 1; i--) {
        answer *= i;
    }
    return answer;
}

// Add
function add(firstOperand, secondOperand) {
    let answer = firstOperand + secondOperand
    return answer
}



// Subtract
function subtract(firstOperand, secondOperand) {
    let answer = firstOperand - secondOperand
    return answer
}

// Divide
function divide(firstOperand, secondOperand) {
    let answer = firstOperand / secondOperand
    return answer
}

// Multiply
function multiply(firstOperand, secondOperand) {
    let answer = firstOperand * secondOperand
    return answer
}


// Power
function power(firstOperand, secondOperand) {
    let answer = 1;
    if (firstOperand === 0) {
        return answer;
    } else {
        for (i = 0; i <= secondOperand; i++) {
            answer = answer * (firstOperand)
        }
        return answer;
    }
}

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
    if (target.classList.contains('btn--delete')) {
        deleteNumber();
        updateDisplay();
    }

    inputNumber(target.value);
    updateDisplay();
  })

  
//   Reset
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
  }

//   function deleteNumber() {
//     calculator.firstOperand = calculator.firstOperand.pop()
// }
  
  function updateDisplay() {
    display.value = calculator.displayValue;
  }
  
  updateDisplay();
  
  
