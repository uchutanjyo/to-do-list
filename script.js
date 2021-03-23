// Menu item
const dishInput = document.querySelector('.dish-input');
const typeInput = document.querySelector('.meal-type-input');
const timeInput = document.querySelector('.time-input');
const submitButton = document.querySelector('.submit');
const editItemButton = document.querySelector('.edit');
let pendingItem = document.querySelector('.pending-item');
let itemType = document.querySelector('.item-type');
let itemTime = document.querySelector('.item-time');


let menuItem = document.querySelector('.item');
let menuItemsArray = [];




// Ingredients
const itemInput = document.querySelector('.item-input');
const qtyInput = document.querySelector('.quantity-select');
const amtInput = document.querySelector('.amt-select');

const addItemBtn = document.querySelector('.add-item');
const clearItemBtn = document.querySelector('.clear');
const submitMenuItem = document.querySelector('#submit-item');
let list = document.querySelector('.list');
let itemsArray = [];
let newItemsArray = []

// confirm
let name1 = document.querySelector('#name');
let type = document.querySelector('#type');
let time = document.querySelector('#time1');
let as = document.querySelector('#as');
let at = document.querySelector('#at');
const confirmIngredients = document.querySelector('.ingredients-list');
const delete1 = document.querySelector('.delete1')




// Menu form
function createMenuItem(e) {
    e.preventDefault();
    if (dishInput.value) {
        let menuItem = {
            name: dishInput.value,
            type: typeInput.value,
            time: timeInput.value,
            id: new Date().getTime(),
        }

        if (!typeInput.value) {
            menuItem.type = 'N/A'
        }
        if (!timeInput.value) {
            menuItem.time = 'N/A'
        }

       dishInput.value = '';
        typeInput.value ='';
       timeInput.value ='';

        if (!menuItemsArray[0]) {
            menuItemsArray.push(menuItem);
        } else if (menuItemsArray[0]) {
            menuItemsArray[0] = menuItem
        }

        renderMenuItem(menuItem);
        console.log(menuItemsArray)
    } else {
        alert("Please Choose A Menu Item Name.")
    }
}

function renderMenuItem(menuItem) {
    pendingItem.textContent = menuItem.name;
    itemType.textContent = menuItem.type
    itemTime.textContent = menuItem.time;
    editItemButton.classList.remove('hidden');
}

function editItemName(e) {
    e.preventDefault();

    if (editItemButton.textContent === 'Edit menu item' && e) {

        pendingItem.contentEditable = "true";
        itemType.contentEditable = "true";
        itemTime.contentEditable = "true";
        pendingItem.classList.toggle('crossout');
        itemType.classList.toggle('crossout');
        itemTime.classList.toggle('crossout');

        editItemButton.textContent = 'Save menu item'


    } else if (editItemButton.textContent === 'Save menu item' && e) {
        editItemButton.textContent = 'Edit menu item'
        pendingItem.contentEditable = "false";
        itemType.contentEditable = "false";
        itemTime.contentEditable = "false";
        pendingItem.classList.toggle('crossout');
        itemType.classList.toggle('crossout');
        itemTime.classList.toggle('crossout');

    }
}

editItemButton.addEventListener('click', editItemName)

submitButton.addEventListener('click', createMenuItem)


// Ingredients form

// render
function render(item) {

    //  Create element, delete button, select button 
    let newingredient = document.createElement('div');
    newingredient.setAttribute('data-key', item.id);

    newingredient.classList.add('new-ingredient')
    let ingredientName = document.createElement('li');

    let qty = document.createElement('li');
    let amt = document.createElement('li');
    let buttonsDiv = document.createElement('div');

    let selectBtn = document.createElement('button');
    let deleteBtn = document.createElement('button');

    ingredientName.textContent = item.text;
    ingredientName.classList.add('ingredient-item');

    qty.classList.add('quantity');
    qty.textContent = item.qty;

    amt.classList.add('amount');
    amt.textContent = item.amt;

    deleteBtn.classList.add('delete');
    deleteBtn.textContent = 'delete';

    selectBtn.classList.add('select');
    selectBtn.textContent = 'select';



    newingredient.appendChild(ingredientName);

    newingredient.appendChild(qty);
    newingredient.appendChild(amt);


    buttonsDiv.appendChild(deleteBtn);
    buttonsDiv.appendChild(selectBtn);
    newingredient.appendChild(buttonsDiv);
    list.appendChild(newingredient);
    if (item.select == true) {
        newingredient.classList.toggle('crossout');

    }

    function deleteItem() {
        // let saved = localStorage.getItem("mylist");
        // newingredient.onclick = e => {
        //     let clicked = newingredient;
        //     console.log(clicked.getAttribute("data-key"));
        //     let newArray = itemsArray.filter(function(item) {

        //         return clicked.getAttribute("data-key") != item.id

        //     })
        //     console.log(newArray);
        //     localStorage.setItem("mylist", JSON.stringify(newArray));
        // }



        list.removeChild(newingredient);

    }
    deleteBtn.addEventListener('click', deleteItem);

    // Mark item as 'select'
    function selectItem() {

        let saved = localStorage.getItem("mylist");
        if (saved) {
            itemsArray = JSON.parse(localStorage.getItem("mylist"));
            console.log(itemsArray)
            newingredient.onclick = e => {
                let clicked = newingredient;
                let result = itemsArray.map(function(item) {
                    const container = {};
                    container.text = item.text;
                    container.qty = item.qty;
                    container.amt = item.amt;
                    container.id = item.id;
                    container.select = item.select;

                    if (clicked.getAttribute("data-key") == item.id && !container.select) {
                        container.select = true;
                        newingredient.classList.toggle('crossout');
                    } else if (clicked.getAttribute("data-key") == item.id && container.select) {
                        container.select = false;
                        newingredient.classList.toggle('crossout');
                    }

                    return container
                })
                console.log(result);
                localStorage.setItem("mylist", JSON.stringify(result));
            }
        }
    }


    selectBtn.addEventListener('click', selectItem);

}

function createItem() {
    if (itemInput.value) {
        let item = {
            text: itemInput.value,
            qty: qtyInput.value,
            amt: amtInput.value,
            id: new Date().getTime(),
            select: false
        }
        if (!qtyInput.value) {
            item.qty = 'N/A'
        }
     itemInput.value  = '';
      qtyInput.value  = '';
       amtInput.value  = '';
        
        itemsArray.push(item);     


        render(item);

    } else {
        alert("If your ingredient is ' ', there's no need to add it to this list.")
    }
}

submitMenuItem.addEventListener('click', confirmMenuItem)

function confirmMenuItem() {
    if (pendingItem.textContent === '' && !name1.textContent) {
        alert("Please enter a dish name.")
        return
    }

    function pushIngredients() {
        for (let item of itemsArray) {
            let ingredient = document.createElement('li');
            if (item.amt === 'N/A') {
                item.amt = '';
            } else if (item.qty === 'N/A') {
                item.qty = ''
            }
            ingredient.textContent = `${item.text} - ${item.qty} - ${item.amt}`;
            confirmIngredients.appendChild(ingredient);
            list.textContent = '';
            newItemsArray.push(item)
        }
    
        };


        if (pendingItem.textContent === '' && name1.textContent && list.textContent) {
            name1.textContent = menuItemsArray[0].name;
            type.textContent = menuItemsArray[0].type;
            time.textContent = menuItemsArray[0].time;
        }

   
   
    else if (pendingItem.textContent != menuItemsArray[0].name ||
        itemType.textContent != menuItemsArray[0].type ||
        itemTime.textContent != menuItemsArray[0].time) {
        menuItemsArray = menuItemsArray.map(function() {
                const cont = {};
                cont.name = pendingItem.textContent;
                cont.type = itemType.textContent;
                cont.time = itemTime.textContent;
                cont.id = new Date().getTime();
                return cont
            }

        )
        console.log(menuItemsArray);

        name1.textContent = menuItemsArray[0].name;
        type.textContent = menuItemsArray[0].type;
        time.textContent = menuItemsArray[0].time;
    } else {

        console.log(menuItemsArray);

        name1.textContent = menuItemsArray[0].name;
        type.textContent = menuItemsArray[0].type;
        time.textContent = menuItemsArray[0].time;

    }

    as.classList.remove('hidden');
    at.classList.remove('hidden');

    if (name1.textContent == '') {

        name1.textContent = menuItemsArray[0].name;
        type.textContent = menuItemsArray[0].type;
        time.textContent = menuItemsArray[0].time;

        pendingItem.textContent = '';
        itemType.textContent = '';
        itemTime.textContent = '';
        editItemButton.classList.add('hidden');


    }
  
    pushIngredients()

    console.log(newItemsArray);
    localStorage.setItem("mylist", JSON.stringify(newItemsArray));
    localStorage.setItem("menuitemlist", JSON.stringify(menuItemsArray));

    itemsArray = []

}


// On click add item to list

function getSaved() {

    let saved = localStorage.getItem("mylist");
    if (saved) {

      newItemsArray = JSON.parse(localStorage.getItem("mylist"));
        console.log(newItemsArray)
        // let i = 0;
        // while (i <= itemsArray.length - 1) {

        //     render(itemsArray[i]);
        //     i++
        // }
        console.log(newItemsArray)
        for (let item of newItemsArray) {
            let ingredient = document.createElement('li');
            if (item.amt === 'N/A') {
                item.amt = '';
            } else if (item.qty === 'N/A') {
                item.qty = ''
            }
            ingredient.textContent = `${item.text} - ${item.qty} - ${item.amt}`;
            confirmIngredients.appendChild(ingredient); }

    
    } else {
        console.log('none')
    }
}
function getsaved1() {
    let saved1 = localStorage.getItem("menuitemlist");
    
    if (saved1) {
        menuItemsArray = JSON.parse(localStorage.getItem("menuitemlist"));
        console.log(menuItemsArray);
        console.log(JSON.parse(localStorage.getItem("menuitemlist")));
        name1.textContent = menuItemsArray[0].name;
        type.textContent = menuItemsArray[0].type;
        time.textContent = menuItemsArray[0].time;
        as.classList.remove('hidden');
        at.classList.remove('hidden');
        
    }
}
getsaved1();
getSaved();

function deleteMenuItem() {

    localStorage.clear();
    confirmIngredients.textContent = '';
    name1.textContent = '';
    type.textContent = '';
    time.textContent = '';
    as.classList.add('hidden');
    at.classList.add('hidden');
    
}

delete1.addEventListener('click', deleteMenuItem)

// Clear to do list
function clearItems() {
    list.innerHTML = "";
    localStorage.clear();
    itemsArray = [];

};

clearItemBtn.addEventListener('click', clearItems);

// Add item event listesner
addItemBtn.addEventListener('click', createItem);