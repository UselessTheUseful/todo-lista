const list = document.querySelector("#list");
const form_input = document.querySelector("#form_input");

document.querySelector('#form_button').addEventListener('click', add_item)          // eventListener for adding to list 

document.querySelector('#remove_completed').addEventListener('click', delete_done)  // eventListener for adding to list 

document.querySelector('#sort_all').addEventListener('click', sort_all)             //
document.querySelector('#sort_completed').addEventListener('click', sort_completed) // eventListeners for list sorting
document.querySelector('#sort_active').addEventListener('click', sort_active)       //

let ls_keys = Object.keys(localStorage);                // getting list element ids from localStorage upon loading/reloading of page
ls_keys.forEach(function(key){                          // creation of list elements from retrieved ids
    let value = localStorage.getItem(key).split("|")    // list element information is split between task name: [0] and completion status: [1]

    const list_item = document.createElement('li');     // creation of list element and setting its id
    list_item.innerHTML = value[0];
    list_item.id = key;
    
    const ready_button = document.createElement('input');   // creation of completion button for list element
    ready_button.type = 'checkbox';
    ready_button.classList.add("checkbox");
    ready_button.addEventListener('click', function() {     // adding functionality to completion button
        list_item.classList.toggle("done");                     // setting done class to list element and updating information in local storage
        if (list_item.className == "done") {
            localStorage.setItem(list_item.id, value[0] + "|done");
        } else {
            localStorage.setItem(list_item.id, value[0] + "|undone");
        }
    });

    if (value[1] == "done") {                               // check if task in localStorage is set to done and adding class and checking completion button accordingly
        list_item.classList.toggle("done");
        ready_button.checked = true;
    }

    const delete_button = document.createElement('button'); // creation of deletion button for list element
    delete_button.type = 'button';
    delete_button.innerHTML = 'Remove';
    delete_button.addEventListener('click', function() {    // adding functionality to task deletion button when pressed
        list.removeChild(list_item);                            // deletion of list element from list and localStorage
        localStorage.removeItem(list_item.id);
    } );
    
    list_item.appendChild(ready_button);
    list_item.appendChild(delete_button);
    list.appendChild(list_item);
});

function add_item() {       // adding of list element from form input
    let task = form_input.value;
    if (task == "") {                   // check and highlight for empty form input
        form_highlight();
        alert("Anna tehtävälle nimi");
    } else if (task.includes("|")) {    // check and highlight for form input with "|" which is required for localStorage functionality 
        form_highlight();
        alert("Tehtävän nimessä ei voi lla '|' merkkiä");
    } else {
        const list_item = document.createElement('li');         // creation of list element from form input and giving it a unique id
        list_item.innerHTML = task;
        list_item.id = String(generate_id());
        
        const ready_button = document.createElement('input');   // creation of completion button for list element
        ready_button.type = 'checkbox';
        ready_button.classList.add("checkbox");
        ready_button.addEventListener('click', function() {     // adding functionality to task completion button when pressed
            list_item.classList.toggle("done");                     // setting done class to list element and updating information in local storage
            if (list_item.className == "done") {
                localStorage.setItem(list_item.id, task + "|done");
            } else {
                localStorage.setItem(list_item.id, task + "|undone");
            }
        });

        const delete_button = document.createElement('button'); // creation of deletion button for list element
        delete_button.type = 'button';
        delete_button.innerHTML = 'Remove';
        delete_button.addEventListener('click', function() {    // adding functionality to deletion button when pressed
            list.removeChild(list_item);                            // deletion of list element from list and localStorage
            localStorage.removeItem(list_item.id);
        } );

        list_item.appendChild(ready_button);                    // appending buttons to list element and appending list element to list
        list_item.appendChild(delete_button);
        list.appendChild(list_item);

        localStorage.setItem(list_item.id, task + "|undone");   // saving list element to localStorage

        form_input.value = "";                                  // form reset to empty for next input by user
    }
}

function delete_done() {    // deletion of all list elements with class of done and removing them from localStorage
    const to_delete = document.querySelectorAll('.done');
    to_delete.forEach(function(value) {
        list.removeChild(value);
        localStorage.removeItem(value.id);
    });
}

function generate_id() {    // generation of an id from lowest available number to prevent infinite incrementation of id number
    ls_keys = Object.keys(localStorage);

    for (let i = 0; i < ls_keys.length; i++){
        if (!ls_keys.includes(String(i))) {
            return i
        }
    }

    return ls_keys.length;
}

function form_highlight() { // highlights form and adds a listener to delete highlight
    form_input.style.boxShadow = "0px 0px 5px red";
    form_input.addEventListener("keydown", form_no_highlight);
}

function form_no_highlight() { // highlights form and adds a listener to delete highlight
    form_input.style.boxShadow = "none";
    form_input.removeEventListener("keydown", form_no_highlight);
}

function sort_all() {   // shows all list elements
    let all_tasks = document.querySelectorAll("li")
    for (x of all_tasks) {
        show(x)
    }
}

function sort_completed() {     // shows completed list elements
    let all_tasks = document.querySelectorAll("li")
    let completed_tasks = document.querySelectorAll(".done")
    for (x of all_tasks) {
        hide(x)
    }
    for (x of completed_tasks) {
        show(x)
    }
}

function sort_active() {        // shows uncompleted list elements
    let all_tasks = document.querySelectorAll("li")
    let completed_tasks = document.querySelectorAll(".done")
    for (x of all_tasks) {
        show(x)
    }
    for (x of completed_tasks) {
        hide(x)
    }
}

function hide(element) { // hides given element
    element.style.display = 'none';
}

function show(element) { // shows given element
    element.style.display = '';
}