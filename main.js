let budgetInput = document.querySelector('.input-budget')
const budgetPlus = document.querySelector('.my-budget .plus')
const budgetMinus = document.querySelector('.my-budget .minus')

function getBudgetValue() {
    let val = Number(budgetInput.value);
    if (isNaN(val)) return 0;
    return val;
}

function updateBudget(newVal) {
    budgetInput.value = newVal;
    // budgetInput.value = newVal.toString().replace(/^0+/, '');
}

budgetPlus.addEventListener('click', () => {
    let currValue = getBudgetValue();
    currValue += 1000;
    updateBudget(currValue);
})

budgetMinus.addEventListener('click', () => {
    let currValue = getBudgetValue();
    currValue -= 1000;
    updateBudget(currValue);
})


document.querySelectorAll('.category').forEach(category => {
    const minus = category.querySelector('.minus')
    const plus = category.querySelector('.plus')
    let moneyInput = category.querySelector('.money-input')


    function getCurrNumberMoney() {
        let val1 = Number(moneyInput.value);
        if (isNaN(val1)) return 0;
        return val1;
    }

    function updateValueMoney(newVal) {
        moneyInput.value = newVal;
    }

    plus.addEventListener('click', () => {
        let currentValue = getCurrNumberMoney();
        currentValue += 1000;
        updateValueMoney(currentValue);

        let budgetValue = getBudgetValue();
        budgetValue -= 1000;
        budgetInput.value = budgetValue;
    })

    minus.addEventListener('click', () => {
        let currentValue = getCurrNumberMoney();
        currentValue -= 1000;
        updateValueMoney(currentValue);

        let budgetValue = getBudgetValue();
        budgetValue += 1000;
        budgetInput.value = budgetValue;

    })


    let isChanged = false; //flag

    moneyInput.addEventListener('input', () => {
        isChanged = true;
    })

    budgetInput.addEventListener('focus', () => {
        let value = getBudgetValue();
        if (value === 0) {
            budgetInput.value = '';
        }
    })

    moneyInput.addEventListener('focus', () => {
        let value = getCurrNumberMoney();
        if (value === 0) {
            moneyInput.value = '';
        }
    })

    document.addEventListener('click', (e) => {
        if (isChanged && !moneyInput.contains(e.target)) {
            let numMoney = getCurrNumberMoney();
            updateValueMoney(numMoney);

            let numBudget = getBudgetValue();

            let count = numBudget - numMoney;
            updateBudget(count);

            isChanged = false;

        }

    })



})

