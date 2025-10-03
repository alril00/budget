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


const addCategory = document.getElementById('add-category')
const allCategory = document.querySelector('.all-categorys');

let categoryNameInput = document.getElementById('category-name')
const modalCategory = document.getElementById('modal')



//// modalCategory


addCategory.addEventListener('click', () => {
    modalCategory.style.display = 'block';
});


document.getElementById('cancel-category').addEventListener('click', () => {
    modalCategory.style.display = 'none';
    categoryNameInput.value = '';

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

    } else {
        alert('введите категорию');
    }
}




// edit //////////////


const editBtn = document.getElementById('edit');
const selectToDelete = document.querySelector('.select-to-delete')
const deleteButtonEdit = document.querySelector('.delete-button');



// edit.addEventListener('click', () => {

//     selectToDelete.style.display = selectToDelete.style.display === 'block' ? 'none' : 'block';

//     // deleteButtonEdit.style.display = selectToDelete.style.display === 'block' ? 'none' : 'block';


//     // document.querySelectorAll('.category').forEach(category => {
//     //     category.style.animation = 'wiggle 1.3s infinite'
//     // })

//     allCategory.addEventListener('click', (e) => {
//         const clickedItem = e.target.closest('.category');
//         if(clickedItem){
//             document.querySelectorAll('.category.selected').forEach(category => {
//                 if(category !== clickedItem) category.classList.remove('selected');
//             });

//             clickedItem.classList.toggle('selected');
//             updateDeleteButtonEdit();
//         }
//     })

//     function updateDeleteButtonEdit() {
//         deleteButtonEdit.style.display = document.querySelectorAll('.category.selected').length > 0 ? 'block' : 'none';
//     }

// })


function edit(e) {
    const target = e.target;

    if (target) {
        selectToDelete.classList.toggle('show');

        const selectedItems = document.querySelectorAll('.category.selected')
        
        if (selectedItems.length > 0) {
            selectedItems.forEach(item => {
                item.classList.remove('selected')
            })
        } else {
            allCategory.addEventListener('click', (e) => {
                const clickedItem = e.target.closest('.category');
                if (clickedItem) {
                    clickedItem.classList.toggle('selected');
                }
            })
        }


    }

};

editBtn.addEventListener('click', edit)