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


function initializeCategory(category) {
    const minus = category.querySelector('.minus');
    const plus = category.querySelector('.plus');
    let moneyInput = category.querySelector('.money-input');

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

}


// button add category


document.querySelectorAll('.category').forEach(category => {
    initializeCategory(category);
})


const addCategory = document.getElementById('add-category')
const allCategory = document.querySelector('.all-categorys');

let categoryNameInput = document.getElementById('category-name')
const modal = document.getElementById('modal')



//// modal


addCategory.addEventListener('click', () => {
    modal.style.display = 'block'; 
});


document.getElementById('cancel-category').addEventListener('click', () => {
    modal.style.display = 'none';
    categoryNameInput.value = '';
})



///// confirm


document.getElementById('confirm-category').addEventListener('click', () => {

    const categoryName = categoryNameInput.value.trim();


    if (categoryName !== '') {
        const newCategory = document.createElement('div');
        newCategory.classList.add('category');

        
        newCategory.innerHTML = `
                        <h2>${categoryName}</h2>
                        <div class="category-buttons">
                            <button class="minus">-</button>
                            <input type="text" value="0" class="money-input">
                            <button class="plus">+</button>
                        </div>`;

        allCategory.appendChild(newCategory);
        initializeCategory(newCategory);
        modal.style.display = 'none';
        categoryNameInput.value = '';

    } else {
        alert('введите категорию');
        // modal.after( 'not')
    }
})


