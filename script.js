import {isWeekend,  getDayName} from "./date-helpers.js";

// Menu item (name, type, time)
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

// Ingredients (incl. add btn, delete btn)
const itemInput = document.querySelector('.item-input');
const qtyInput = document.querySelector('.quantity-select');
const amtInput = document.querySelector('.amt-select');

const addItemBtn = document.querySelector('.add-item');
const clearItemBtn = document.querySelector('.clear');
const submitMenuItem = document.querySelector('#submit-item');
let list = document.querySelector('.list');
let itemsArray = [];
let newItemsArray = []

// Confirm (append menu item/ingredient to step 3.)
let name1 = document.querySelector('#name');
let type = document.querySelector('#type');
let time = document.querySelector('#time1');
let as = document.querySelector('#as');
let at = document.querySelector('#at');
const confirmIngredients = document.querySelector('.ingredients-list');
const delete1 = document.querySelector('.delete1');
let confirmedMenuItemArray = [];

// Menu form - step 1.
function createMenuItem(e) {
    e.preventDefault();
    if (dishInput.value) {
        let menuItem = {
            name: dishInput.value,
            type: typeInput.value,
            time: timeInput.value,
            id: new Date().getTime(),
        }
        // Set default values if type/time not entered
        if (!typeInput.value) {
            menuItem.type = 'other'
        }
        if (!timeInput.value) {
            menuItem.time = 'N/A'
        }
        // Reset inputs
       dishInput.value = '';
        typeInput.value ='';
       timeInput.value ='';
        // Push new menu item to menuItemsArray
        if (!menuItemsArray[0]) {
            menuItemsArray.push(menuItem);
        } else if (menuItemsArray[0]) {
            menuItemsArray[0] = menuItem
        }
        // Append menu item info to pending item section (top of step 2)
        renderMenuItem(menuItem);
    } else {
        alert("Please Choose A Menu Item Name.")
    }
}


     // Append menu item info to pending item section (top of step 2)
function renderMenuItem(menuItem) {
    pendingItem.textContent = menuItem.name;
    itemType.textContent = menuItem.type
    itemTime.textContent = menuItem.time;
    // Make edit button visible
    editItemButton.classList.remove('hidden');
}

// Append item to step 2. event listener
submitButton.addEventListener('click', createMenuItem)

// Make pending item in step 2. editable/save edits
function editItem(e) {
    e.preventDefault();
    if (editItemButton.textContent === 'Edit menu item' && e) {
        pendingItem.contentEditable = "true";
        itemType.contentEditable = "true";
        itemTime.contentEditable = "true";
        pendingItem.classList.toggle('crossout');
        itemType.classList.toggle('crossout');
        itemTime.classList.toggle('crossout');
        editItemButton.textContent = 'Save menu item'
        // Save edits
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

// Edit item event listener
editItemButton.addEventListener('click', editItem)

// Ingredients form
// Creates ingredient li, delete/select buttons and appends to step 2.
function renderIngredient(item) {
    //  Create element, delete button, select button 
    const newIngredient = document.createElement('div');
    newIngredient.setAttribute('data-key', item.id);
    newIngredient.classList.add('new-ingredient')
    const ingredientName = document.createElement('li');
    const qty = document.createElement('li');
    const amt = document.createElement('li');
    const buttonsDiv = document.createElement('div');
    const selectBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
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

    // Append ingredienet info to newIngredient div
    newIngredient.appendChild(ingredientName);
    newIngredient.appendChild(qty);
    newIngredient.appendChild(amt);
    // Append buttons to buttons div
    buttonsDiv.appendChild(deleteBtn);
    buttonsDiv.appendChild(selectBtn);
    newIngredient.appendChild(buttonsDiv);
    // Append newIngredient div to ingredients list div
    list.appendChild(newIngredient);
    // Toggle 'selected' class
    if (item.select == true) {
        newIngredient.classList.toggle('crossout');
    }

    // Delete individual ingredient from step 2.
    function deleteItem() {
        list.removeChild(newIngredient);
    }
    deleteBtn.addEventListener('click', deleteItem);

    // Mark item as 'select' *** this function still has no use in this project ***
    // ** will probably use for  saving 'legend' info in localstorage. ***
    function selectItem() {
        let saved = localStorage.getItem("mylist");
        if (saved) {
            itemsArray = JSON.parse(localStorage.getItem("mylist"));
            newIngredient.onclick = e => {
                let clicked = newIngredient;
                let result = itemsArray.map(function(item) {
                    const container = {};
                    container.text = item.text;
                    container.qty = item.qty;
                    container.amt = item.amt;
                    container.id = item.id;
                    container.select = item.select;

                    if (clicked.getAttribute("data-key") == item.id && !container.select) {
                        container.select = true;
                        newIngredient.classList.toggle('crossout');
                    } else if (clicked.getAttribute("data-key") == item.id && container.select) {
                        container.select = false;
                        newIngredient.classList.toggle('crossout');
                    } 
                    return container
                })
                localStorage.setItem("mylist", JSON.stringify(result));
            }
        }
    }

    // 'Selected' item event listener
    selectBtn.addEventListener('click', selectItem);

}

// Create ingredient object/appends ingredients to step 2.
function createIngredientObject() {
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
        // Reset step 2. inputs
     itemInput.value  = '';
      qtyInput.value  = '';
       amtInput.value  = '';
        // push ingredients list to its own array
        itemsArray.push(item);     
        // Renders ingredients to step 2.
        renderIngredient(item);

    } else {
        alert("If your ingredient is ' ', there's no need to add it to this list.")
    }
}

// Make step 3. pending menu item
function confirmMenuItem() {
    //Alert when trying to submit ingredients to step 3. without a dish name
    if (pendingItem.textContent === '') {
        alert("Please enter a dish name.")
        return
    }
// Append ingredients to step 3.
    else if (pendingItem.textContent) {
        for (let item of itemsArray) {
            let ingredient = document.createElement('li');
            if (item.amt === 'N/A') {
                item.amt = '';
            } else if (item.qty === 'N/A') {
                item.qty = ''
            }
            ingredient.textContent = `${item.text} - ${item.qty} - ${item.amt}`;
            confirmIngredients.appendChild(ingredient);
            // Reset step 2. ingredient list
            list.textContent = '';
            // Push to array to be used in local storage
            newItemsArray.push(item)
        };

        // Push menu item details to step 3.
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
        name1.textContent = menuItemsArray[0].name;
        type.textContent = menuItemsArray[0].type;
        time.textContent = menuItemsArray[0].time;
    } else {
        name1.textContent = menuItemsArray[0].name;
        type.textContent = menuItemsArray[0].type;
        time.textContent = menuItemsArray[0].time;

    }
    // Reveal 'as' (actually 'for'..) and 'at' elements
    as.classList.remove('hidden');
    at.classList.remove('hidden');

    // If step 3. name empty, on load populate name, type, time from array (taken from local storage)
    if (name1.textContent == '') {
        name1.textContent = menuItemsArray[0].name;
        type.textContent = menuItemsArray[0].type;
        time.textContent = menuItemsArray[0].time;

        pendingItem.textContent = '';
        itemType.textContent = '';
        itemTime.textContent = '';
        editItemButton.classList.add('hidden');
    }
  
    // Add menu item + ingredients to local storage (to be retrieved step 3.). 
    localStorage.setItem("mylist", JSON.stringify(newItemsArray));
    localStorage.setItem("menuitemlist", JSON.stringify(menuItemsArray));
    // Set ingredients array to empty
    itemsArray = []

} }

submitMenuItem.addEventListener('click', confirmMenuItem)


// Clear menu items list from step 2.
function clearMenuItems() {
    list.innerHTML = "";
    localStorage.clear();
    itemsArray = [];

};

// Clear items event listener
clearItemBtn.addEventListener('click', clearMenuItems);

// Delete menu item, ingredients and localstorage for step 3.
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

// Add item event listesner
addItemBtn.addEventListener('click', createIngredientObject);

// Create Small Calendar
const today = new Date();
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
const calendarTitle = document.querySelector('.todays-date');
calendarTitle.innerHTML = `Today's date: ${date}`;

const calendar = document.querySelector("#app-calendar");

function daysInThisMonth() {
    return new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();
  }

for (let day = 1; day <= daysInThisMonth(); day++) {
   
    const weekend = isWeekend(day);
    let name = "";
    if(day <= 7) {
        const dayName = getDayName(day);
        name = `<div class ="name">${dayName}</div>`;


    }
    calendar.insertAdjacentHTML("beforeend", `<div class="week ${weekend ? "weekend" : ""}">
 <div class ="name">${name}</div> <div class="day">${day}</div></div>`);
}

// large calendar
const menuCalendarContainer = document.querySelector('.modal-container');
const menuCalendar = document.querySelector('#modal');
const openCalendarBtn = document.querySelector('.open-calendar');
const closeCalendarBtn = document.querySelector('.close-calendar');

const modalWeek = document.querySelector('.modal-week');
const modalDate = document.querySelector('#modal-date');
modalDate.innerHTML = `Today's date: ${date}`;


for (let day = 1; day <= daysInThisMonth(); day++) {
   
    const weekend = isWeekend(day);
    let name = "";
    if(day <= 7) {
        const dayName = getDayName(day);
        name = `<div class ="name">${dayName}</div>`;
    }
    menuCalendar.insertAdjacentHTML("beforeend", `<div class="modal-week ${weekend ? "weekend" : ""}">
 <div class ="name">${name}</div> <div class="day">${day}</div></div>`);
}

 
// Show Large Calendar Modal
function showModal() {
menuCalendarContainer.classList.toggle('show-modal');
}

// Close modal calendar
function closeModal() {
    menuCalendarContainer.classList.toggle('show-modal');
}

// Open/close calendar modal event listeners 
openCalendarBtn.addEventListener('click', showModal);
closeCalendarBtn.addEventListener('click', closeModal);

let dayOfWeek = document.querySelectorAll('.week');
let dayOfWeekModal  = document.querySelectorAll('.modal-week');

const week = document.querySelector('.week');
const submitToCalendarBtn = document.querySelector('#submit');

function createBigCalendar() {
dayOfWeek.forEach(week => {
week.addEventListener('click', event => {
    let crossed = event.currentTarget;
    // Day # of clicked element on small calendar
    let crossed3 = event.currentTarget.children[1].textContent
    // Makes  array of all day #s from large calendar; finds day# with same # as clicked element on small calendar
    let crossed2 = Array.from(document.querySelectorAll('.modal-week .day')).filter(day => day.textContent == crossed3)[0];
    crossed2.parentElement.classList.toggle('crossout')

crossed.classList.toggle('crossout');

 })})
}

// On load create big calendar
createBigCalendar()

// Check if any days of week contain 'crossout' class
function isCrossout() {
    Array.from(dayOfWeek).some(day =>{ 
        
        return day.classList.contains('crossout') === true
    })}

// Append to calendar, takes calendar days as paramter
function submitToCalendar (daysOfMonth) {
   if (isCrossout()) {
    alert("Please select a calendar day.")
    
   }
   
   else if (!isCrossout()) {
    if (daysOfMonth === dayOfWeek) {createMenuObject() }

        daysOfMonth.forEach(day => { 
          
            if (day.classList.contains('crossout') ) {
               let a = document.createElement('a');
             
               a.classList.add('legend');
            if (type.textContent == 'breakfast') {
                a.innerHTML = `<a  id="breakfast" class="legend"></a>`; }
            else if(type.textContent == 'lunch') {
                a.innerHTML = `<a  id="lunch" class="legend"></a>`; }
                else if(type.textContent == 'dinner') {
                    a.innerHTML = `<a  id="dinner" class="legend"></a>`; }
                    else if(type.textContent == 'snack') {
                        a.innerHTML = `<a  id="snack" class="legend"></a>`; }
                        else if(type.textContent == 'other') {
                            a.innerHTML = `<a  id="other" class="legend"></a>`; }
             

               day.appendChild( a);
               day.classList.toggle('crossout');
               
             }    
}) 
} }
// Submit 'legend dots' to small and large calendars 
submitToCalendarBtn.addEventListener('click', () =>  {submitToCalendar(dayOfWeek); submitToCalendar(dayOfWeekModal)})
let confirmedMenuItem = {}; 




// Change key name of ingredient objects
const clone = (obj) => Object.assign({}, obj);
const renameKey = (object, key, newKey) => {
    const clonedObj = clone(object);
    const targetKey = clonedObj[key];
    delete clonedObj[key];
  
    clonedObj[newKey] = targetKey;
    return clonedObj;
  
  };

// Create menu object for each calendar date, push to local storage
function createMenuObject() {
    confirmedMenuItem = Object.assign(confirmedMenuItem,  newItemsArray, menuItemsArray[0],)
    // Rename ingredient objects 'ingredient: [ingredient #]'
     for(let propt in confirmedMenuItem){
        if (!isNaN(propt)) {
           confirmedMenuItem =  renameKey(confirmedMenuItem, `${propt}`, `ingredient: ${propt}`)
          ;}
    }
        // confirmedMenuItem.legend = [];
        // confirmedMenuItem.legend.push(anchor);
        // confirmedMenuItem.days = [];
        // confirmedMenuItem.days.push(daynum);
        confirmedMenuItemArray.push(confirmedMenuItem)
        console.log (confirmedMenuItem)

        localStorage.setItem("confirmedmenu", JSON.stringify(confirmedMenuItemArray));

}




// Get everything from local storage

// Get ingredient list from local storage
function getSaved() {
    let saved = localStorage.getItem("mylist");
    if (saved) {
      newItemsArray = JSON.parse(localStorage.getItem("mylist"));
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
        console.log('Nothing saved in local storage for step 3.')
    }
}

// Get menu item name and details from local storage
function getSaved1() {
    let saved1 = localStorage.getItem("menuitemlist");
    
    if (saved1) {
        menuItemsArray = JSON.parse(localStorage.getItem("menuitemlist"));
        name1.textContent = menuItemsArray[0].name;
        type.textContent = menuItemsArray[0].type;
        time.textContent = menuItemsArray[0].time;
        as.classList.remove('hidden');
        at.classList.remove('hidden');
        
    }
}

// Get 'legend' (dots indicating menu items on calendars) from local storage
function getSaved2() {
    let saved1 = localStorage.getItem("menuitemlist");
    
    if (saved1) {
        menuItemsArray = JSON.parse(localStorage.getItem("menuitemlist"));
        name1.textContent = menuItemsArray[0].name;
        type.textContent = menuItemsArray[0].type;
        time.textContent = menuItemsArray[0].time;
        as.classList.remove('hidden');
        at.classList.remove('hidden');
        
    }
}

function getSaved3() {
    console.log(JSON.parse(localStorage.getItem("confirmedmenu")))
    if (JSON.parse(localStorage.getItem("confirmedmenu")) ) {
    confirmedMenuItemArray = JSON.parse(localStorage.getItem("confirmedmenu"));
    confirmedMenuItemArray.forEach(item => {
        dayOfWeek.forEach(day => { 
            if (day.children[1].textContent == item.id) {
            const a = document.createElement('a');
            a.classList.add('legend');
            a.innerHTML = item.legend;
            day.appendChild(a) }
        })
        })
    } else {
         console.log('POO' ) 
        }

}
// On load, get everything from local storage
getSaved();
getSaved1();
getSaved2();
getSaved3();
