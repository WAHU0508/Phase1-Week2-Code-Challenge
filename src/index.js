document.addEventListener('DOMContentLoaded', () => {
    //declare elements as variables
    const shoppingList = [];
    const itemsList = document.getElementById('itemsList'); //list
    const addNewItem = document.getElementById('new_item'); //inputs
    const addButton = document.getElementById('addButton');
    const clearButton = document.getElementById('clearButton');

    const dateTime = document.getElementById('dayOfWeek')
    const date = new Date().toDateString();
    dateTime.textContent = `Date: ${date}`;
    //add items to my list
    addButton.addEventListener('click', () => {
        const newItem = addNewItem.value;
        //If the newitem value is not empty, it is added to shopping list array and the addNewItem field is cleared.
        if (newItem) {
            shoppingList.push(newItem);
            displayList(newItem);
            addNewItem.value = '';
        }
    });

    //display my list of items and check off purchased items
    function displayList(item) {
        const listItem = document.createElement('li');
        const hr = document.createElement('hr');
        listItem.textContent = `${item} `;
        console.log(listItem);
        listItem.appendChild(hr)
        itemsList.appendChild(listItem);

        //Click to cross off purchased items
        listItem.addEventListener('click', () => {
            listItem.classList = 'purchased'
        })
        
        //Double click to edit items on the list
        listItem.addEventListener('dblclick', (e) => {
            const editItem = document.createElement('input');
            editItem.type = 'text';
            editItem.value = listItem.textContent;
            listItem.replaceWith(editItem);
            editItem.classList.add('editing')

            //Press enter to update the list with edited item
            editItem.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const newval = editItem.value;
                    if (newval) {
                        const index = shoppingList.indexOf(listItem.textContent);
                        if (index !== -1) {
                            shoppingList[index] = newval;
                        }
                        const updateItem = document.createElement('li');
                        updateItem.textContent = newval;
                        editItem.replaceWith(updateItem);
                        updateItem.appendChild(hr)
                    }
                    else {
                        editItem.replaceWith(listItem);
                        editItem.appendChild(hr)
                    }
                }
            })
        })

    }

    //clear my shopping list
    clearButton.addEventListener('click', () => {
        itemsList.innerHTML = '';
    })
})