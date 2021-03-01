const itemInput = document.querySelector('.item-input');
const addItemBtn = document.querySelector('.add-item');
const list = document.querySelector('.list'); 

let items = [];


// Add item to to do list
function addItem(e) {

    e.preventDefault();
 if (itemInput.value) {
       let newLi = document.createElement('li');
        let deleteBtn = document.createElement('button');
        let doneBtn = document.createElement('button');

        deleteBtn.classList.add('delete');
        deleteBtn.textContent = 'delete';

        doneBtn.classList.add('done');
        doneBtn.textContent = 'done';

        items.push(newLi);
        
        for (let item of items) {
            newLi.textContent = itemInput.value;
            list.appendChild(newLi);
            newLi.appendChild(deleteBtn);
            newLi.appendChild(doneBtn);

        }

            function deleteItem() {
                list.removeChild(newLi);
            }
            deleteBtn.addEventListener('click', deleteItem);
       


        
    }

    else {
        alert("WHY")
    }

    }

    // Delete item


addItemBtn.addEventListener('click', addItem);

