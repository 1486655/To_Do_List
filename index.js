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
        <div class = "todo">
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

    //to save to local storage
    localStorage.setItem('todos', JSON.stringify({todoList}))
}

addBtn.addEventListener('click', addTodo) // upon clicking the button the addTodo function will occur