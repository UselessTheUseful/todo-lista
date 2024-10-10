let list = document.querySelector("#list");
let textNode = document.createTextNode("Remove");

document.querySelector('#input').addEventListener('click', add_item)

document.querySelector('#remove_completed').addEventListener('click', delete_done)

function add_item() {
    let task = document.querySelector("#form_input").value;
    if (task == "") {
        alert("Task can't be empty");
    } else {
        let list_item = document.createElement('li');
        list_item.innerHTML = task;
        
        ready_button = document.createElement('input');
        ready_button.type = 'checkbox';
        ready_button.classList.add("checkbox");;
        ready_button.addEventListener('click', function() {
            if (ready_button.checked) {
                list_item.classList.add("done");;
            } else {
                list_item.classList.remove("done")
            }
        });

        delete_button = document.createElement('button');
        delete_button.type = 'button';
        delete_button.innerHTML = 'Remove';
        delete_button.addEventListener('click', function() {
            list.removeChild(list_item)
        } );
        

        list_item.appendChild(ready_button);
        list_item.appendChild(delete_button);
        list.appendChild(list_item);
    }
}

function delete_done() {
    let to_delete = document.querySelectorAll('.done');
    to_delete.forEach(function(value) {
        list.removeChild(value)
    });
}