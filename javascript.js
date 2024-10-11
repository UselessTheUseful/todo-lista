const list = document.querySelector("#list");
let ls_keys = Object.keys(localStorage);
const form_input = document.querySelector("#form_input");

document.querySelector('#form_button').addEventListener('click', add_item)

document.querySelector('#remove_completed').addEventListener('click', delete_done)

document.querySelector('#sort_all').addEventListener('click', sort_all)

document.querySelector('#sort_completed').addEventListener('click', sort_completed)

document.querySelector('#sort_active').addEventListener('click', sort_active)

ls_keys.forEach(function(key){
    let value = localStorage.getItem(key).split("|")

    const list_item = document.createElement('li');
    list_item.innerHTML = value[0];
    list_item.id = key;
    
    const ready_button = document.createElement('input');
    ready_button.type = 'checkbox';
    ready_button.classList.add("checkbox");
    ready_button.addEventListener('click', function() {
        list_item.classList.toggle("done");
        if (list_item.className == "done") {
            localStorage.setItem(list_item.id, value[0] + "|done");
        } else {
            localStorage.setItem(list_item.id, value[0] + "|undone");
        }
    });

    if (value[1] == "done") {
        list_item.classList.toggle("done");
        ready_button.checked = true;
    }

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
    let task = form_input.value;
    if (task == "") {
        form_highlight();
        alert("Anna tehtävälle nimi");
    } else if (task.includes("|")) {
        form_highlight();
        alert("Tehtävän nimessä ei voi lla '|' merkkiä");
    } else {
        const list_item = document.createElement('li');
        list_item.innerHTML = task;
        list_item.id = String(generate_id());
        
        const ready_button = document.createElement('input');
        ready_button.type = 'checkbox';
        ready_button.classList.add("checkbox");
        ready_button.addEventListener('click', function() {
            list_item.classList.toggle("done");
            if (list_item.className == "done") {
                localStorage.setItem(list_item.id, task + "|done");
            } else {
                localStorage.setItem(list_item.id, task + "|undone");
            }
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

        localStorage.setItem(list_item.id, task + "|undone");

        form_input.value = "";
    }
}

function delete_done() {
    const to_delete = document.querySelectorAll('.done');
    to_delete.forEach(function(value) {
        list.removeChild(value);
        localStorage.removeItem(value.id);
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

function form_highlight() {
    form_input.style.boxShadow = "0px 0px 5px red";
    form_input.addEventListener("keydown", form_no_highlight);
}

function form_no_highlight() {
    form_input.style.boxShadow = "none";
    form_input.removeEventListener("keydown", form_no_highlight);
}

function sort_all() {
    let all_tasks = document.querySelectorAll("li")
    for (x of all_tasks) {
        show(x)
    }
}

function sort_completed() {
    let all_tasks = document.querySelectorAll("li")
    let completed_tasks = document.querySelectorAll(".done")
    for (x of all_tasks) {
        hide(x)
    }
    for (x of completed_tasks) {
        show(x)
    }
}

function sort_active() {
    let all_tasks = document.querySelectorAll("li")
    let completed_tasks = document.querySelectorAll(".done")
    for (x of all_tasks) {
        show(x)
    }
    for (x of completed_tasks) {
        hide(x)
    }
}

function hide(element) {
    element.style.display = 'none';
}

function show(element) {
    element.style.display = '';
}