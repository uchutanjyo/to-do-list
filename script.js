// Menu item
const dishInput = document.querySelector('.dish-input');
const typeInput = document.querySelector('.meal-type-input');
const timeInput = document.querySelector('.time-input');
const submitButton = document.querySelector('.submit');
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
let list = document.querySelector('.list');
let itemsArray = [];


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
            menuItemsArray.push(menuItem);
         
            renderMenuItem(menuItem);
            localStorage.setItem("menuitemlist", JSON.stringify(menuItemsArray));
            console.log(menuItemsArray)
        } else {  
            alert("Please Choose A Menu Item Name.")
        }
    }

  function  renderMenuItem (menuItem) {
    pendingItem.textContent = menuItem.name;
    itemType.textContent = menuItem.type
    itemTime.textContent = menuItem.time;

  }

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
            let saved = localStorage.getItem("mylist");
             newingredient.onclick = e => {
                 let clicked = newingredient;
                 console.log(clicked.getAttribute("data-key") 
                 );
                let newArray =  itemsArray.filter(function(item) {
                  
                       return clicked.getAttribute("data-key") != item.id
                        
                        }  )  
                        console.log(newArray) ;      
                        localStorage.setItem("mylist", JSON.stringify(newArray));}
                  
                

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
         let result =  itemsArray.map(function(item)  {
            const container = {};
            container.text = item.text;
            container.qty = item.qty;
            container.amt = item.amt; 
            container.id = item.id; 
            container.select = item.select;
 
            if (clicked.getAttribute("data-key") == item.id && !container.select){
                container.select = true;
                newingredient.classList.toggle('crossout');
            } 
                else if(clicked.getAttribute("data-key") == item.id && container.select){
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
        console.log(item.id)
        itemsArray.push(item);
     
        render(item);
        localStorage.setItem("mylist", JSON.stringify(itemsArray));
    } else {  
        alert("WHY? (please type something you need to do today)")
    }
}

// On click add item to list

function getSaved() {
    let saved = localStorage.getItem("mylist");
    if (saved) {
        itemsArray = JSON.parse(localStorage.getItem("mylist"));
console.log(itemsArray)
           let i=0;
        while(i <= itemsArray.length -1) {
     
            render(itemsArray[i]);
            i++
        }
    }
    else {
        console.log('none')
    }
}
getSaved();

// Clear to do list
function clearItems() {
    list.innerHTML = "";
    localStorage.clear();
    itemsArray = [];

};

clearItemBtn.addEventListener('click', clearItems);

// Add item event listesner
addItemBtn.addEventListener('click', createItem);

