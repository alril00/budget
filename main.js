let budgetInput = document.querySelector('.input-budget')
const budgetPlus = document.querySelector('.my-budget .plus')
const budgetMinus = document.querySelector('.my-budget .minus')

const addCategory = document.getElementById('add-category')
const allCategory = document.querySelector('.all-categorys');

const categoryNameInput = document.getElementById('category-name')
const modalCategory = document.getElementById('modal')

const editBtn = document.getElementById('edit');
const selectToDelete = document.querySelector('.select-to-delete')
const deleteButtonEdit = document.querySelector('.delete-button');

const selectedItems = document.querySelectorAll('.category.selected');


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
    let enterPressedMoney = false; //flag for tap enter

    // let checkMoney = 

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
        };

        isChanged = false;
        enterPressedMoney = false;

    })

    document.addEventListener('click', (e) => {
        if (isChanged && !moneyInput.contains(e.target)) {
            processiInput(); //если поле ввода изменилось, то вызывается эта функция, чтобы обработать ввод

        }

    })

    moneyInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !enterPressedMoney) {


            processiInput();
            enterPressedMoney = true;
        }
    })

    function processiInput() {
        let numMoney = getCurrNumberMoney();
        updateValueMoney(numMoney);

        let numBudget = getBudgetValue();
        let count = numBudget - numMoney;
        updateBudget(count);

        isChanged = false;
    }

}


// button add category


document.querySelectorAll('.category').forEach(category => {
    initializeCategory(category);
})





//// modalCategory


addCategory.addEventListener('click', () => {
    modalCategory.style.display = 'block';
});


document.getElementById('cancel-category').addEventListener('click', () => {
    modalCategory.style.display = 'none';
    categoryNameInput.value = '';
    document.querySelector('.category-name-hint').classList.remove('show')

});


///// confirm


document.getElementById('confirm-category').addEventListener('click', () => {
    createNewCategory();

});

categoryNameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        createNewCategory();
    }
})

function createNewCategory() {

    const categoryName = categoryNameInput.value.trim();

    if (categoryName !== '') {
        const newCategory = document.createElement('div');
        newCategory.classList.add('category');


        newCategory.innerHTML = `
                        <h2>${categoryName}</h2>
                        <div class="category-buttons">
                            <button class="minus">-</button>
                            <input inputmode="numeric" type="text" value="0" class="money-input">
                            <button class="plus">+</button>
                        </div>`;

        allCategory.appendChild(newCategory);
        initializeCategory(newCategory);
        modalCategory.style.display = 'none';
        categoryNameInput.value = '';

        if (document.querySelectorAll('.category').length >= 8) {
            allCategory.style.height = '500px'
        }
    }
    else {
        document.querySelector('.category-name-hint').classList.add('show')
    }
};





// edit //////////////

let isEditMode = false;

function toggleEditMode() {
    isEditMode = !isEditMode;

    // if (isEditMode) {
    //     document.querySelectorAll('.category.selected').forEach(item => {
    //         item.classList.remove('selected');
    //     });
    // }

}

allCategory.addEventListener('click', (e) => {
    const clickedItem = e.target.closest('.category');
    if (clickedItem && isEditMode) {
        clickedItem.classList.toggle('selected');
    }
});


function edit() {
    toggleEditMode();
    
    selectToDelete.classList.toggle('show');
    deleteButtonEdit.classList.toggle('show');

    // Очистить все выделения при входе в режим редактирования
    document.querySelectorAll('.category.selected').forEach(item => {
        item.classList.remove('selected');
    });
}


editBtn.addEventListener('click', edit);

function trash() {
    const currentSelectedItems = document.querySelectorAll('.category.selected');

    
    currentSelectedItems.forEach(item => {
        item.remove();
    });
}

deleteButtonEdit.addEventListener('click', trash);

// if (document.querySelectorAll('.category').length >= 8) {
//     allCategory.style.height = '500px';
// }

