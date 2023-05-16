const currentNumber  = document.querySelector('.currentNumber')
const numberBtn  = document.querySelectorAll('.number')
const operator  = document.querySelectorAll('.operator')
const previousNumber = document.querySelector('.previousNumber')
const mathSign = document.querySelector('.mathSign')
const equals = document.querySelector('.equals')
const history = document.querySelector('.history')
const clear = document.querySelector('.clear')
const historyBtn = document.querySelector('.history-btn')




function addingHistory(result){
    const newLi = document.createElement('li');
    const newText = document.createTextNode(`${previousNumber.innerHTML} ${mathSign.innerHTML} ${currentNumber.innerHTML} = ${result}`)
    newLi.appendChild(newText);
    history.appendChild(newLi)
    historyBtn.classList.add('active')
}

function displayNumber() {

    if(currentNumber.innerHTML === '' && this.textContent === '.') currentNumber.innerHTML = '0'
    if(currentNumber.innerHTML === '0' && this.textContent !=='.') currentNumber.innerHTML += '.'
    if(currentNumber.innerHTML.includes('.')&& this.textContent ==='.') return;
    if (currentNumber.innerHTML === '' && this.textContent === '00')  return;


    currentNumber.innerHTML += this.textContent
}

function addOperator() {

    if( previousNumber.innerHTML !== '' && mathSign.innerHTML !=='') mathSign.innerHTML = this.textContent;
    if (currentNumber.innerHTML === '') return;
    if( previousNumber.innerHTML !== '') showResult();


    previousNumber.innerHTML = currentNumber.innerHTML;
    currentNumber.innerHTML = '';
    mathSign.innerHTML = this.textContent;
}

function showResult() {

    const operator = mathSign.innerHTML;
    const prevNum = Number(previousNumber.innerHTML);
    const currNum = Number(currentNumber.innerHTML);
    let result;

    switch (operator) {
        case '+' : result = prevNum + currNum; break
        case '-' : result = prevNum - currNum; break
        case 'x' : result = prevNum * currNum; break
        case '^' : result = prevNum ** currNum; break
        case ':' :
            if(currNum === 0){
                return;
            }else
            result = prevNum / currNum;
        break

    }

    if(previousNumber.innerHTML !== ''&& currentNumber.innerHTML !== '') addingHistory(result);
    else return;


    if(this.textContent === '='&& previousNumber.innerHTML !=='' ){
            currentNumber.innerHTML = result;
            previousNumber.innerHTML = ''
            mathSign.innerHTML = '';
    }
    else return 0;


}

function clearDisplay() {
    currentNumber.innerHTML = '';
    previousNumber.innerHTML = ''
    mathSign.innerHTML = '';
}

function clearHistory(){
    history.textContent = '';
    if(history.textContent === '')  historyBtn.classList.remove('active')
}


numberBtn.forEach(btn => {
    btn.addEventListener('click',displayNumber)
})
operator.forEach(btn => {
    btn.addEventListener('click', addOperator)
})
equals.addEventListener('click', showResult)
clear.addEventListener('click', clearDisplay)
historyBtn.addEventListener('click', clearHistory)