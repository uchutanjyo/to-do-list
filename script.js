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
            newLi.after(deleteBtn);
            newLi.after(doneBtn);

        }

            function deleteItem() {
                list.removeChild(newLi);
                list.removeChild(deleteBtn);
                list.removeChild(doneBtn);
            }
            deleteBtn.addEventListener('click', deleteItem);

            function doneItem() {
                console.log('poo');
                newLi.classList.toggle('crossout');
            }

            doneBtn.addEventListener('click', doneItem);



        
    }

    else {
        alert("WHY")
    }

    }

    // Delete item


addItemBtn.addEventListener('click', addItem);

