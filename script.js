import {
    isWeekend,
    getDayName
} from "./date-helpers.js";

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
const layer = document.querySelector('.layer')
let menuItemsArray = [];

// Ingredients (incl. add btn, delete btn)
const itemInput = document.querySelector('.item-input');
const qtyInput = document.querySelector('.quantity-select');
const amtInput = document.querySelector('.amt-select');

const addItemBtn = document.querySelector('.add-item');
const clearItemBtn = document.querySelector('.clear');
const submitMenuItem = document.querySelector('#submit-item');
let besideList = document.querySelector('.beside-list');
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
        typeInput.value = '';
        timeInput.value = '';
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
    buttonsDiv.classList.add('buttons-div')
    const deleteBtn = document.createElement('li');
    deleteBtn.innerHTML = '<i class="far fa-trash-alt delete"></i>';
    deleteBtn.classList.add('delete-button')
    ingredientName.textContent = item.text;
    ingredientName.classList.add('ingredient-item');
    qty.classList.add('quantity');
    qty.textContent = item.qty;
    amt.classList.add('amount');
    amt.textContent = item.amt;
    deleteBtn.classList.add('delete');

    // Append ingredienet info to newIngredient div
    newIngredient.appendChild(ingredientName);
    newIngredient.appendChild(qty);
    newIngredient.appendChild(amt);
    // Append buttons to buttons div
    buttonsDiv.appendChild(deleteBtn);
    // newIngredient.appendChild(buttonsDiv);
    // Append newIngredient div to ingredients list div
    besideList.appendChild(buttonsDiv)
    list.appendChild(newIngredient);

    // Delete individual ingredient from step 2.
    function deleteItem() {
        list.removeChild(newIngredient);
        besideList.removeChild(buttonsDiv)

        itemsArray = []
    }
    deleteBtn.addEventListener('click', deleteItem);

}

// Create ingredient object/appends ingredients to step 2.
function createIngredientObject() {
    if (name1.textContent && pendingItem.textContent) {
        alert('Please delete menu item in step 3.');
        return
    }

    if (itemInput.value) {
        let item = {
            text: itemInput.value,
            qty: qtyInput.value,
            amt: amtInput.value,
            id: new Date().getTime(),
        }
        if (!qtyInput.value) {
            item.qty = 'N/A'
        }
        if (!amtInput.value) {
            item.amt = 'N/A'
        }
        // Reset step 2. inputs
        //  itemInput.value  = '';
        qtyInput.value = '';
        amtInput.value = '';
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
    newItemsArray = [];
    //Alert when trying to submit ingredients to step 3. without a dish name
    if (pendingItem.textContent === '' && name1.textContent === '') {
        alert("Please enter a dish name.")
        return
    }

    if (name1.textContent && pendingItem.textContent ||
        list.textContent && confirmIngredients.textContent != '') {
        alert('Please delete menu item in step 3.');
        return
    }

    // Append ingredients to step 3.
    else if (pendingItem.textContent) {

        for (let item of itemsArray) {
            let ingredient = document.createElement('li');
            // if (item.amt === 'N/A') {
            //     item.amt = '';
            // } else if (item.qty === 'N/A') {
            //     item.qty = ''
            // }
            if (name1.textContent && name1.textContent != menuItemsArray[0].name) {

                newItemsArray = [];
                confirmIngredients.textContent = '';
            } 

            ingredient.innerHTML = `   <span id="ingredient-name"><b>${item.text}</b></span>  
            <span class="menu-item-ingredient"> <i>qty:</i>  ${item.qty} </span>  <span class="menu-item-ingredient"><i>amt:</i> ${item.amt}</span> `;
            confirmIngredients.appendChild(ingredient);
            // Reset step 2. ingredient list
            list.textContent = '';
            // Push to array to be used in local storage
            newItemsArray.push(item)
            localStorage.setItem("mylist", JSON.stringify(newItemsArray));
            itemsArray = []

        };


        // Push menu item details to step 3.
        if (pendingItem.textContent === '' && name1.textContent && list.textContent) {
            name1.textContent = menuItemsArray[0].name;
            type.textContent = menuItemsArray[0].type;
            time.textContent = menuItemsArray[0].time;
        } else if (pendingItem.textContent != menuItemsArray[0].name ||
            itemType.textContent != menuItemsArray[0].type ||
            itemTime.textContent != menuItemsArray[0].time) {
            menuItemsArray = menuItemsArray.map(function() {
                const cont = {};
                cont.name = pendingItem.textContent;
                cont.type = itemType.textContent;
                cont.time = itemTime.textContent;
                cont.id = new Date().getTime();
                return cont
            })
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


        }
        pendingItem.textContent = '';
        itemType.textContent = '';
        itemTime.textContent = '';
        besideList.innerHTML = "";

        editItemButton.classList.add('hidden');

        // Add menu item + ingredients to local storage (to be retrieved step 3.). 

        localStorage.setItem("menuitemlist", JSON.stringify(menuItemsArray));
        // Set ingredients array to empty

    }
}
submitMenuItem.addEventListener('click', confirmMenuItem)

// Clear menu items list from step 2.
function clearMenuItems() {
    list.innerHTML = "";
    besideList.innerHTML = "";
    itemsArray = [];

};

// Clear items event listener
clearItemBtn.addEventListener('click', clearMenuItems);

// Delete menu item, ingredients and localstorage for step 3.
function deleteMenuItem() {
    localStorage.removeItem("menuitemlist");
    localStorage.removeItem("mylist");
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
const month = today.toLocaleString('en-EN', {
    month: 'long'
});
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const calendarTitle = document.querySelector('.todays-date');
calendarTitle.innerHTML = `Today's date: ${date}`;

const calendar = document.querySelector("#app-calendar");

function daysInThisMonth() {
    return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
}

for (let day = 1; day <= daysInThisMonth(); day++) {

    const weekend = isWeekend(day);
    let name = "";
    if (day <= 7) {
        const dayName = getDayName(day);
        name = `<div class ="name">${dayName}</div>`;


    }
    calendar.insertAdjacentHTML("beforeend", `<div class="week ${weekend ? "weekend" : ""}">
 <div class ="name">${name}</div> <div class="day">${day}</div></div>`);
}

// large calendar
const menuCalendarContainer = document.querySelector('.modal-container');
const menuCalendar = document.querySelector('#modal');
const deleteCalendarBtn = document.querySelector('.delete-calendar');
const openCalendarBtn = document.querySelector('.open-calendar');
const closeCalendarBtn = document.querySelector('.close-calendar');

const modalWeek = document.querySelector('.modal-week');
const modalDate = document.querySelector('#modal-date');
modalDate.innerHTML = `Today's date: ${date}`;


for (let day = 1; day <= daysInThisMonth(); day++) {

    const weekend = isWeekend(day);
    let name = "";
    if (day <= 7) {
        const dayName = getDayName(day);
        name = `<div class ="name">${dayName}</div>`;
    }
    menuCalendar.insertAdjacentHTML("beforeend", `<div class="modal-week ${weekend ? "weekend" : ""}">
 <div class ="name">${name}</div> <div class="day">${day}</div></div>`);
}

// Show Large Calendar Modal
function showModal() {
    menuCalendarContainer.classList.toggle('show-modal');
    document.body.style.overflow = 'hidden';

}

// Close modal calendar
function closeModal() {
    menuCalendarContainer.classList.toggle('show-modal');
    document.body.style.overflow = 'visible';
}

// Open/close calendar modal event listeners 
openCalendarBtn.addEventListener('click', showModal);
closeCalendarBtn.addEventListener('click', closeModal);

let dayOfWeek = document.querySelectorAll('.week');
let dayOfWeekModal = document.querySelectorAll('.modal-week');

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
            // crossed2.parentElement.classList.toggle('crossout')

            crossed.classList.toggle('crossout');

        })
    })
}

// On load create big calendar
createBigCalendar()

// Check if any days of week contain 'crossout' class
function isCrossout() {
    Array.from(dayOfWeek).some(day => {

        return day.classList.contains('crossout') === true
    })
}

// Append to calendar, takes calendar days as paramter
function submitToCalendar(daysOfMonth) {

    if (!name1.textContent) {
        alert('Please complete step 1 and 2.');
        return
    }

    if (isCrossout()) {
        alert("Please select a calendar day.")
        return
    } else if (!isCrossout()) {

        daysOfMonth.forEach(day => {

            if (day.classList.contains('crossout')) {
                let a = document.createElement('a');

                a.classList.add('legend');
                if (type.textContent == 'breakfast') {
                    a.innerHTML = `<a  id="breakfast" class="legend"></a>`;
                } else if (type.textContent == 'lunch') {
                    a.innerHTML = `<a  id="lunch" class="legend"></a>`;
                } else if (type.textContent == 'dinner') {
                    a.innerHTML = `<a  id="dinner" class="legend"></a>`;
                } else if (type.textContent == 'snack') {
                    a.innerHTML = `<a  id="snack" class="legend"></a>`;
                } else if (type.textContent == 'other') {
                    a.innerHTML = `<a  id="other" class="legend"></a>`;
                }
                day.appendChild(a);
                let daynum = day.children[1].textContent;

                if (daysOfMonth === dayOfWeek) {
                    createMenuObject(daynum, a)
                }

                let largeCalendarArray = Array.from(document.querySelectorAll('.modal-week .day'))

                largeCalendarArray.forEach(p => {
                    if (daynum == p.childNodes[0].textContent) {
                        const li = document.createElement('li');
                        confirmedMenuCalendar.forEach(item => {
                            if (item.day == day.children[1].textContent) {
                                item.menu.forEach(i => {
                                    li.textContent = `${i.name} for ${i.type}`
                                })
                            }
                        })
                        p.appendChild(a.cloneNode(true));
                        p.appendChild(li);
                    }
                })
                day.classList.toggle('crossout');

            }
        })
    }
}
// Submit 'legend dots' to small and large calendars 
submitToCalendarBtn.addEventListener('click', () => {
    submitToCalendar(dayOfWeek);
})
submitToCalendarBtn.addEventListener('click', () => {
    submitToCalendar(dayOfWeekModal);
})
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

let confirmedMenuCalendar = [];
// ******
// Create menu object for each calendar date, push to local storage
function createMenuObject(daynum, anchor) {
    if (JSON.parse(localStorage.getItem("confirmedmenu"))) {
        confirmedMenuCalendar = JSON.parse(localStorage.getItem("confirmedmenu"));
    }
    // create the object and assign proeprties from menu item

    for (let propt in confirmedMenuItem) {
        if (isNaN(propt)) {
            confirmedMenuItem = renameKey(confirmedMenuItem, `${propt}`, undefined)
        }
    }
    confirmedMenuItem = Object.assign(confirmedMenuItem, newItemsArray, menuItemsArray[0])

    for (let propt in confirmedMenuItem) {
        if (!isNaN(propt)) {
            confirmedMenuItem = renameKey(confirmedMenuItem, `${propt}`, `ingredient ${(propt + 1)}`)
        }
    }
    confirmedMenuItem.legend = anchor.innerHTML;
    // Find days which are already elements in days array
    let existingDay = confirmedMenuCalendar.filter(i => {
        return i.day == daynum
    })
    // If there is no existing day in confirmedMenuCalendar array for the selected calendar day
    if (existingDay == '') {
        // Create day object, push
        let obj = {
            day: `${daynum}`,
            menu: []
        }
        // Push menu item to 'menu' for selected calendar day
        obj.menu.push(confirmedMenuItem);
        // Push 'day' to 'confirmedMenuCalendar' array
        confirmedMenuCalendar.push(obj)
        localStorage.setItem("confirmedmenu", JSON.stringify(confirmedMenuCalendar));

    }
    // If 'day' object already exists for calendar day, just push menu item to existing day
    else {
        existingDay[0].menu.push(confirmedMenuItem);
        localStorage.setItem("confirmedmenu", JSON.stringify(confirmedMenuCalendar));

    }
}


// Create modal when day clicked on large calendar
function createDayModal() {
    
    if (menuCalendar.childNodes[30]) {
        menuCalendar.childNodes[30].remove
    }
    
    let dayModalContainer = document.createElement('div');

    let dayModalText = document.createElement('div');

    let largeCalendarArray = Array.from(document.querySelectorAll('.modal-week .day'))

    dayOfWeekModal.forEach(week => {
        week.addEventListener('click', function something(event) {
            let clicked = event.currentTarget.children[1].textContent;

            function getClickedDay(i) {

                if (clicked.charAt(1) && i.day == `${clicked.charAt(0)}${clicked.charAt(1)}`) {
                    console.log(i.day === `${clicked.charAt(0)}${clicked.charAt(1)}`)
                    return i.day == `${clicked.charAt(0)}${clicked.charAt(1)}`
                } else {
                    return i.day == clicked.charAt(0)
                }

            }

            let modalObject = []

            if (confirmedMenuCalendar.filter(getClickedDay).length > 1) { 
                console.log(confirmedMenuCalendar.filter(getClickedDay))
            modalObject = confirmedMenuCalendar.filter(getClickedDay)[1]
        } else {
            modalObject = confirmedMenuCalendar.filter(getClickedDay)[0]
        }


            console.log(confirmedMenuCalendar.filter(getClickedDay))

            let dayModalTitle = document.createElement('h1');
            if (modalObject == undefined) {
                dayModalTitle.textContent = "No menu created for this day.";
                dayModalText.appendChild(dayModalTitle)

            } else {
                dayModalTitle.textContent = `Menu for ${month} ${modalObject.day}:`;
                dayModalTitle.classList.add('day-modal-title')
                dayModalText.classList.add('day-modal-text')

                dayModalText.appendChild(dayModalTitle)

                modalObject.menu.forEach(o => {
                    let dayModalDiv = document.createElement('div');

                    dayModalDiv.classList.add('day-modal-item');
                    dayModalDiv.innerHTML = `<span class="menu-item-ingredient">${o.name}</span> <i>for</i> 
          <span class="menu-item-ingredient">${o.type}</span><i> at</i> <span class="menu-item-ingredient">${o.time}</span> 
           <br><br> <h3 class="ingredients">Ingredients:</h3> `
                    for (let [i, q] of Object.entries(o)) {

                        if (i.includes('ingredient')) {
                            let ingredient = document.createElement('li');
                            ingredient.textContent = q.text;
                            dayModalDiv.appendChild(ingredient)

                        }
                    }
                    dayModalText.appendChild(dayModalDiv)

                })
            }


            let closeDayModalBtn = document.createElement('button');
            closeDayModalBtn.setAttribute('id', 'close-day-modal');

            closeDayModalBtn.textContent = 'Close';

            dayModalText.appendChild(closeDayModalBtn)
            dayModalText.classList.add('day-modal')
            dayModalContainer.appendChild(dayModalText.cloneNode(true))
            dayModalContainer.classList.add('day-modal-container')
            menuCalendar.addEventListener('click', function(e) {

                menuCalendar.appendChild(dayModalContainer);
                for (let i = 30; i <= menuCalendar.childNodes.length; i++) {
                    if (menuCalendar.childNodes.length > 31) {
                        menuCalendar.childNodes[i].remove()
                    }
                }
            });

            return
        })

    })

}

document.addEventListener('click', function(e) {
    if (e.target && e.target.id == 'close-day-modal') {
        menuCalendar.childNodes[30].remove();
        menuCalendarContainer.style.overflow = 'visible';

    }
    return

});

function poo(){dayOfWeekModal.forEach(week => {
    week.addEventListener('click', () => {  
        menuCalendarContainer.style.overflow = 'hidden'; });


})
}



dayOfWeekModal.forEach(week => {
    week.addEventListener('click', createDayModal);


})



function resetFields() {
    itemInput.value = '';
    qtyInput.value = '';
    amtInput.value = '';
}
// Get everything from local storage
// Get ingredient list from local storage
function getSaved() {

    if (localStorage.getItem("mylist")) {
        newItemsArray = JSON.parse(localStorage.getItem("mylist"));
        for (let item of newItemsArray) {
            let ingredient = document.createElement('li');
            if (item.amt === 'N/A') {
                item.amt = 'N/A';
            } else if (item.qty === 'N/A') {
                item.qty = ''
            }
            ingredient.innerHTML = ` <span id="ingredient-name"><b>${item.text}</b></span>  
            <span class="menu-item-ingredient"> <i>qty:</i>  ${item.qty} </span>  <span class="menu-item-ingredient"><i>amt:</i> ${item.amt}</span> `;
            confirmIngredients.appendChild(ingredient);
        }

    } else {
        console.log('Nothing saved in local storage for step 3.')
    }
}

// Get menu item name and details from local storage
function getSaved1() {
    if (localStorage.getItem("menuitemlist")) {
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
    if (JSON.parse(localStorage.getItem("confirmedmenu"))) {
        confirmedMenuCalendar = JSON.parse(localStorage.getItem("confirmedmenu"));

        confirmedMenuCalendar.forEach(item => {
            dayOfWeek.forEach(dd => {
                if (item.day == dd.children[1].textContent) {
                    item.menu.forEach(i => {
                        const a = document.createElement('a');
                        a.classList.add('legend');
                        a.innerHTML = i.legend
                        dd.appendChild(a);
                        let largeCalendarArray = Array.from(document.querySelectorAll('.modal-week .day'))

                        largeCalendarArray.forEach(p => {
                            if (p.childNodes[0].textContent == dd.children[1].textContent) {
                                const a = document.createElement('a');

                                a.classList.add('legend');
                                a.innerHTML = i.legend
                                p.appendChild(a)
                                const li = document.createElement('li');
                                li.textContent = `${i.name} for ${i.type}`
                                p.appendChild(li);

                            }
                        })
                    })
                }
            })
        })
    }
}

// On load, get everything from local storage
getSaved();
getSaved1();
getSaved2();
resetFields();
poo() 

// Delete all menu items from calendar/local storage
function deleteCalendar() {
    localStorage.clear();
}

deleteCalendarBtn.addEventListener('click', deleteCalendar)