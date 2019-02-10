
let addButton = document.getElementById("addButton");
let todoContent = document.getElementById("todoContent")
let itemList = document.getElementById("itemList")

fetch('/todo/all').then(
    response => response.json()
).then( (allTodo) =>{
    console.log(allTodo);
    allTodo.forEach(element => { 
        createNewItem(element.title, element.done)
    });
})

itemList.addEventListener("click", function(e) {
    if (e.target.tagName === 'LI') {
        let itemIndex = findTodoIndex(e.target);
        fetch(`/todo/check/${itemIndex}`).then(
            () => {
                e.target.classList.toggle("checked");
            }
            , () => {
                return alert("failed");
            }
        )
    } 
})
let addToDo = function () {
    if (todoContent.value) {
        fetch(`/todo/add/${todoContent.value}`).then(
            () => {
                let newValue = todoContent.value;
                createNewItem(newValue); 
            },
            () => {
                return alert("failed");
            }
        );   
    }  
}
/**
 * @param {MouseEvent} e 
 */

let findTodoIndex = function (element) {
    let itemIndex;
    let itemTotal = itemList.children;
    const itemCount = itemTotal.length
    for (let i=0; i < itemCount; i++) {
        if (itemTotal[i] === element) {
            itemIndex = itemCount - i - 1;
            return itemIndex
        }
    }
}
 
let removeItem = function (e) {
    let itemToRemove = e.target.parentNode
    let itemIndex = findTodoIndex(itemToRemove);
    fetch(`/todo/remove/${itemIndex}`).then(
        (response) => {
            if (response.ok) { 
            itemList.removeChild(itemToRemove);
        }},
        () => {
            return alert("failed");
        }
    )
}     
addButton.addEventListener("click", addToDo);

function createNewItem(newValue, done = false) {
    let newItem = document.createElement("li");
    newItem.textContent = newValue;
    let delButton = document.createElement("span");
    delButton.textContent = "x";
    delButton.className = "delButton";
    newItem.appendChild(delButton);
    itemList.prepend(newItem);
    delButton.addEventListener("click", removeItem);
    if (done === true) {
        newItem.className = "checked";
    }
}
