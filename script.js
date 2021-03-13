const itemInput = document.querySelector('.item-input');
const addItemBtn = document.querySelector('.add-item');
const clearItemBtn = document.querySelector('.clear');
let list = document.querySelector('.list');
let itemsArray = [];


// render
function render(item) {

    //  Create element, delete button, done button 
    let newLi = document.createElement('li');
    newLi.setAttribute('data-key', item.id);
    newLi.textContent = item.text;

    let doneBtn = document.createElement('button');
    let deleteBtn = document.createElement('button');

        deleteBtn.classList.add('delete');
        deleteBtn.textContent = 'delete';

        doneBtn.classList.add('done');
        doneBtn.textContent = 'done';

        newLi.appendChild(deleteBtn);
        newLi.appendChild(doneBtn);
        list.appendChild(newLi);
        
        function deleteItem() {
            let saved = localStorage.getItem("mylist");
             window.onclick = e => {
                 let clicked = e.target.parentElement;
                let newArray =  itemsArray.filter(function(item) {
                    console.log(clicked.getAttribute("data-key") 
                    );
                       return clicked.getAttribute("data-key") != item.id
                        
                        }  )  
                        console.log(newArray) ;      
                        localStorage.setItem("mylist", JSON.stringify(newArray));}
                  
                

            list.removeChild(newLi);

        }
        deleteBtn.addEventListener('click', deleteItem);

    // Mark item as 'done'
    function doneItem() {

        newLi.classList.toggle('crossout');
    }

    doneBtn.addEventListener('click', doneItem);

} 

function createItem() {
if (itemInput.value) {
        let item = {
            text: itemInput.value,
            id: new Date().getTime()
        }
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
        console.log(itemsArray);

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

