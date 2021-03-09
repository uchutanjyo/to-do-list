const itemInput = document.querySelector('.item-input');
const addItemBtn = document.querySelector('.add-item');
const clearItemBtn = document.querySelector('.clear');
let list = document.querySelector('.list');
let itemsArray = [];

// render
function render(items) {

    //  Create element, delete button, done button 
    let newLi = document.createElement('li');
    let doneBtn = document.createElement('button');
    let deleteBtn = document.createElement('button');

        deleteBtn.classList.add('delete');
        deleteBtn.textContent = 'delete';

        doneBtn.classList.add('done');
        doneBtn.textContent = 'done';


        newLi.textContent = items;
        newLi.id = new Date().getTime();
        newLi.appendChild(deleteBtn);
        newLi.appendChild(doneBtn);
        list.appendChild(newLi);

    // Delete item from list
    function deleteItem() {

  
console.log(b())

        let saved = localStorage.getItem("mylist");
        if (saved) {
            itemsArray = JSON.parse(localStorage.getItem("mylist"));
        itemsArray.splice(b, 1);
        localStorage.setItem("mylist", JSON.stringify(itemsArray));
        console.log(itemsArray)
    } 
    list.removeChild(newLi);
}
    deleteBtn.addEventListener('click', deleteItem);


    // Mark item as 'done'
    function doneItem() {

        newLi.classList.toggle('crossout');
    }

    doneBtn.addEventListener('click', doneItem);

} 



// On click add item to list
function createItem() {
    if (itemInput.value) {
        itemsArray.push(itemInput.value);
        render(itemInput.value);
        localStorage.setItem("mylist", JSON.stringify(itemsArray));

    
       
    } else {
        alert("WHY (please type something you need to do today)")
    }

}

function getSaved() {
    let saved = localStorage.getItem("mylist");
    if (saved) {
        itemsArray = JSON.parse(localStorage.getItem("mylist"));
        console.log(itemsArray);

           let i=0;
        while(i <= itemsArray.length -1) {
            render(itemsArray[i]);
            i++;

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

