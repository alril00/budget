
document.querySelectorAll('.category').forEach(category => {
    const minus = category.querySelector('.minus')
    const plus = category.querySelector('.plus')
    let moneyNumber = category.querySelector('.money-input')


    function getCurrValue() {
        let val1 = Number(moneyNumber.value);
        if (isNaN(val1)) return 0;
        return val1;
    }

    function updateValue(newVal) {
        moneyNumber.value = newVal;
    }

    plus.addEventListener('click', () => {
        let currentValue = getCurrValue();
        currentValue += 1000;
        updateValue(currentValue);
    })

    minus.addEventListener('click', () => {
        let currentValue = getCurrValue();
        currentValue -= 1000;
        updateValue(currentValue);
    })

})

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
}

budgetPlus.addEventListener( 'click', () => {
    let currValue = getBudgetValue();
    currValue += 1000;
    updateBudget(currValue);
})

budgetMinus.addEventListener( 'click', () => {
    let currValue = getBudgetValue();
    currValue -= 1000;
    updateBudget(currValue);
})


