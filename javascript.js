const list = document.querySelector("#list");
let ls_keys = Object.keys(localStorage);

document.querySelector('#form_button').addEventListener('click', add_item)

document.querySelector('#remove_completed').addEventListener('click', delete_done)

ls_keys.forEach(function(key){
    const list_item = document.createElement('li');
    list_item.innerHTML = localStorage.getItem(key);
    list_item.id = key;
    
    const ready_button = document.createElement('input');
    ready_button.type = 'checkbox';
    ready_button.classList.add("checkbox");;
    ready_button.addEventListener('click', function() {
        list_item.classList.toggle("done");;
    });

    const delete_button = document.createElement('button');
    delete_button.type = 'button';
    delete_button.innerHTML = 'Remove';
    delete_button.addEventListener('click', function() {
        list.removeChild(list_item);
        localStorage.removeItem(list_item.id);
    } );
    
    list_item.appendChild(ready_button);
    list_item.appendChild(delete_button);
    list.appendChild(list_item);
});

function add_item() {
    let task = document.querySelector("#form_input");
    if (task.value == "") {
        alert("Task can't be empty");
    } else {
        const list_item = document.createElement('li');
        list_item.innerHTML = task.value;
        list_item.id = String(generate_id());
        
        const ready_button = document.createElement('input');
        ready_button.type = 'checkbox';
        ready_button.classList.add("checkbox");;
        ready_button.addEventListener('click', function() {
            list_item.classList.toggle("done");;
        });

        const delete_button = document.createElement('button');
        delete_button.type = 'button';
        delete_button.innerHTML = 'Remove';
        delete_button.addEventListener('click', function() {
            list.removeChild(list_item);
            localStorage.removeItem(list_item.id);

        } );
        

        list_item.appendChild(ready_button);
        list_item.appendChild(delete_button);
        list.appendChild(list_item);

        localStorage.setItem(list_item.id, task.value);

        task.value = "";
    }
}

function delete_done() {
    const to_delete = document.querySelectorAll('.done');
    to_delete.forEach(function(value) {
        list.removeChild(value);
    });
}

function generate_id() {
    ls_keys = Object.keys(localStorage);

    for (let i = 0; i < ls_keys.length; i++){
        if (!ls_keys.includes(String(i))) {
            return i
        }
    }

    return ls_keys.length;
}