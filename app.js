/*
امکانات:
- اضافه کردن آیتم بدون محدودیت در تعداد
- کاربر نمی تواند آیتم خالی اضافه کند
- کاربر نمی تواند مقدار تکراری وارد کند
-امکان حذف آیتم
-امکان اضافه کردن مجدد آیتم حذف شده
-امکان علامت دار کردن آیتم به عنوان انجام شده
-در قسمت فیلتر می تواند تمام آیتم ها، آیتم های انجام شده(علامت دار) و آیتم های ناتمام را مشاهده کند
*/



//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const msg = document.querySelector('.msg');
const filterOption = document.querySelector(".filter-todo")
let todos = [];
let repeated = 0;


//Event Listeners

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);



//Functions

function addTodo(e) {
    e.preventDefault();
    //TODO Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // اگر کاربر چیزی وارد نکرده به آن اعلام کند
    if (!todoInput.value) {
        msg.classList.add('show-msg');
        msg.innerText = "Make an Item";
    }

    // اگر کاربر چیزی وارد کرده 2 حالت دارد
    if (todoInput.value) {
        // اگر مقدار وارد شده تکراری است به کاربر اعلام کند
        if (todos.includes(todoInput.value)) {
            msg.classList.add('show-msg');
            msg.innerText = `${todoInput.value} is Repeated `;
            repeated++;
        }
        // اگر مقدار وارد شده تکراری نیست آیتم را میسازد
        if (!todos.includes(todoInput.value) || todos.length == 0) {


            //Create Li
            const newTodo = document.createElement('li');
            newTodo.classList.add('todo-item');
            newTodo.innerText = todoInput.value;
            msg.classList.remove('show-msg')
            todoDiv.appendChild(newTodo);
            // todos.push(todoInput.value);


            //Completed Button
            const completedButton = document.createElement('button');
            completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
            completedButton.classList.add('complete-btn');
            todoDiv.appendChild(completedButton);


            //Trash Button
            const trashButton = document.createElement('button');
            trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
            trashButton.classList.add('trash-btn');
            todoDiv.appendChild(trashButton);

            //append todoDiv to List
            todoList.appendChild(todoDiv);
        }


        todos.push(todoInput.value);
        todoInput.value = "";
    }




}


function deleteCheck(e) {
    const item = e.target;
    // حذف کردن  

    // اگر آیتمی حذف شد مجدداً اجازه اضافه شدن به لیست را دارد
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        const deleteRepeatedItem = todos.indexOf(todo.firstElementChild.innerText);
        todos.splice(deleteRepeatedItem, 1)
        //Animation
        todo.classList.add("fall");
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });

    }

    // اگر آیتمی ابتدا به صورت تکراری وارد شد زمانی که حذف شود مجدداً می تواند به لیست اضافه شود
    if (repeated > 0) {
        if (item.classList[0] === 'trash-btn') {
            const todo = item.parentElement;
            //از فیلتر استفاده کردم چون آیتم تکراری انتخاب شده
            todos.filter((repeatedItem) => {
                //item.previousElementSibling.previousElementSibling==todo.firstElementChild  
                repeatedItem = todos.indexOf(todo.firstElementChild.innerText);
                todos.splice(repeatedItem, 1)
            })
            //Animation
            todo.classList.add("fall");
            todo.addEventListener('transitionend', function () {
                todo.remove();
            });
            repeated--;
        }
    }

    // انجام شدن (check mark)
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;

        }
    });
}



