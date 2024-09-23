const textarea = document.querySelector('textarea') //query from front end in text area
const addBtn = document.getElementById('addBtn') //this is liniked to the button of adding a todo
const todoContainer = document.querySelector('.todoContainer') 

let todoList = []

function initialLoad() {
    if(!localStorage.getItem('todos')) {return}
    todoList = JSON.parse(localStorage.getItem('todos')).todoList
    updateUI()
}

initialLoad()

function addTodo(){
    const todo = textarea.value
    console.log('Added Todo: ', todo)
    if(!todo){return} //if no value in input comes back empty
    todoList.push(todo) 
    textarea.value = '' //resets value in textarea to empty
    updateUI()
}

function editTodo(index){
    textarea.value = todoList[index] //this is to help edit
    todoList = todoList.filter((element, elementIndex) => {
        if (index === elementIndex) {return false}
        return true
    })
    updateUI()
}

function deleteTodo(index){
    todoList = todoList.filter((element, elementIndex) => {
        if (index === elementIndex) {return false}
        return true
    })
    updateUI()
}

function updateUI(){
    let newInnerHTML = ''
    todoList.forEach((todoElement, todoIndex) =>{
        newInnerHTML += `
        <div class = "todo" draggable="true" ondragstart="drag(event)" id="todo-${todoIndex}">
            <p>${todoElement}</p>
            <div class="btnContainer">
                <button class="iconBtn" onclick="editTodo(${todoIndex})">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="iconBtn" onclick="deleteTodo(${todoIndex})">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
        `
    })

    todoContainer.innerHTML = newInnerHTML

    // Add event listeners for drag and drop
    const todos = document.querySelectorAll('.todo');
    todos.forEach(todo => {
        todo.addEventListener('dragover', allowDrop);
        todo.addEventListener('drop', drop);
    });

    //to save to local storage
    localStorage.setItem('todos', JSON.stringify({todoList}))
}

function allowDrop(event) {
    event.preventDefault(); // Prevent default to allow drop
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id); // Store the id of the dragged element
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text"); // Get the id of the dragged element
    const draggedElementIndex = parseInt(data.split('-')[1]); // Extract the index

    // Get the target index from the drop event
    const targetElement = event.target.closest('.todo');
    const targetIndex = Array.from(todoContainer.children).indexOf(targetElement);

    // Move the dragged element to the new position
    const draggedElement = todoList.splice(draggedElementIndex, 1)[0];
    todoList.splice(targetIndex, 0, draggedElement); // Insert the dragged element at the target index

    updateUI(); // Refresh the UI
}

addBtn.addEventListener('click', addTodo) // upon clicking the button the addTodo function will occur