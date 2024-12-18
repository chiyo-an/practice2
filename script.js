
const display = document.querySelector('.calculator-display__result');
const buttons = document.querySelectorAll('.button');

let firstOperand = null; // 첫 번째 숫자
let operator = null; // 연산자
let waitSecond = false; // 두 번째 숫자 입력 상태

// 계산기 함수 
function calculate(firstOperand, operator, secondOperand) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    }
    if (operator === '-') {
        return firstOperand - secondOperand;
    }
    if (operator === '*') {
        return firstOperand * secondOperand;
    }
    if (operator === '/') {
        return firstOperand / secondOperand;
    }
    if (operator === '%') {
        return firstOperand % secondOperand;
    }
    return secondOperand;
}

buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        const displayValue = button.textContent; // 클릭된 버튼의 텍스트 값

        // 숫자 버튼
        if (button.classList.contains('number')) {
            if (waitSecond) { // 두번째 숫자를 입력 할 떄 
                display.textContent = displayValue; // 디스플레이 값을 새로 입력된 값으로 교체
                waitSecond = false; // 두번째 숫자 입력 받기 해제
            } else {
                if (display.textContent === '0') { // 디스플레이 값이 0일 때
                    display.textContent = displayValue; // 입력된 숫자로 대입
                } else {
                    display.textContent += displayValue; // 기존 값에 입력된 숫자를 이어 붙임
                }
            }
        }

        // 소수점 버튼
        if (displayValue === '.') {
            if (!display.textContent.includes('.')) { // 디스플레이에 소수점이 없을 때 소수점 추가
                display.textContent += '.';
            }
        }

        // 연산자 버튼
        if (button.classList.contains('operator')) {
            if (firstOperand === null) { // 첫번째 숫자 값이 없을 때 
                firstOperand = parseFloat(display.textContent); // 디스플레이 값을 숫자로 변환해 저장
            } else if (operator) { // 첫번째 숫자와 연산자까지 입력됬을 떄
                const result = calculate(firstOperand, operator, parseFloat(display.textContent)); // 계산 실행
                display.textContent = result; // 계산 결과
                firstOperand = result; // 결과를 첫번째 숫자로 저장 (다른 연산자를 바로 누를경우 계산 이어 나갈수있게)
            }
            operator = displayValue; // 현재 버튼 값을 연산자로 저장
            waitSecond = true; // 연산자에 숫자 이어붙이기 방지 
        }

        // = 계산 결과
        if (displayValue === '=') {
            if (operator && firstOperand !== null) { // 연산자, 첫번째 숫자 둘다 존재할 때
                const result = calculate(firstOperand, operator, parseFloat(display.textContent)); // 계산 실행
                display.textContent = result; // 계산 결과를 디스플레이에 표시
                // 계산기 끝난상태, 초기화
                firstOperand = result; // 추가적으로 연산자 입력하여 계산 가능하게
                operator = null;
                waitSecond = false; //초기화
            }
        }

        // C 계산 초기화
        if (displayValue === 'C') {
            display.textContent = '0';
            firstOperand = null;
            operator = null;
            waitSecond = false;
        }
    });
});





