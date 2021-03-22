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

// confirm
let name1 = document.querySelector('#name');
let type = document.querySelector('#type');
let time = document.querySelector('#time1');
let as = document.querySelector('#as');
let at = document.querySelector('#at');
let confirmIngredients = document.querySelector('.confirm-ingredients');




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

             if (!menuItemsArray[0]) {
            menuItemsArray.push(menuItem);
             }
            else if (menuItemsArray[0]) {
                menuItemsArray [0] = menuItem
            }
         
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
    editItemButton.classList.remove('hidden');


  }

  function editItemName (e) {
      e.preventDefault();

      if (editItemButton.textContent === 'Edit menu item' && e) {
      
  pendingItem.contentEditable = "true"; 
  itemType.contentEditable = "true"; 
itemTime.contentEditable = "true"; 
pendingItem.classList.toggle('crossout');
itemType.classList.toggle('crossout');
itemTime.classList.toggle('crossout');

editItemButton.textContent = 'Save menu item'


      }

      else if (editItemButton.textContent === 'Save menu item' && e) {
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
        alert("If your ingredient is ' ', there's no need to add it to this list.")
    }
}

submitMenuItem.addEventListener('click', confirmMenuItem)

function confirmMenuItem() {
    if (pendingItem.textContent != menuItemsArray[0].name ||
       itemType.textContent != menuItemsArray[0].type ||
        itemTime.textContent != menuItemsArray[0].time) {
        menuItemsArray =  menuItemsArray.map(function()  {
            const cont = {};
            cont.name = pendingItem.textContent;
            cont.type = itemType.textContent;
            cont.time= itemTime.textContent;
            cont.id = new Date().getTime();
            return cont
        } )
    console.log(menuItemsArray);

        name1.textContent = menuItemsArray[0].name;
 type.textContent = menuItemsArray[0].type;
 time.textContent = menuItemsArray[0].time;
    }
    else {
    
    console.log(menuItemsArray);

name1.textContent = menuItemsArray[0].name;
 type.textContent = menuItemsArray[0].type;
 time.textContent = menuItemsArray[0].time;

    }

as.classList.remove('hidden');
at.classList.remove('hidden');


for (let item of itemsArray) {
    let ingredient = document.createElement('li');
    if (item.amt === 'N/A') {item.amt = '';}
    else if (item.qty )  { item.qty = ''}
 ingredient.textContent =  `${item.text} ${item.qty} ${item.amt}`;

 confirmIngredients.appendChild(ingredient);
 clearItems();
 editItemButton.classList.add('hidden');

 pendingItem.textContent = '';
       itemType.textContent = '';
        itemTime.textContent = ''


};


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

