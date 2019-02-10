
let addButton = document.getElementById("addButton");
let todoContent = document.getElementById("todoContent")
let itemList = document.getElementById("itemList")

fetch('/todo/all').then(
    response => response.json()
).then( (allTodo) =>{
    allTodo.forEach(element => { createNewItem(element)
    });
})

itemList.addEventListener("click", function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle("checked");
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
let removeItem = function (e) {
    let itemIndex;
    let itemTotal = itemList.children;
    const itemCount = itemTotal.length
    for (let i=0; i < itemCount; i++) {
        if (itemTotal[i] === e.target.parentNode) {
            itemIndex = itemCount - i - 1;
            break
        }
    }
    fetch(`/todo/remove/${itemIndex}`).then(
        (response) => {
            if (response.ok) { 
            let todoItem = e.target.parentNode;
            itemList.removeChild(todoItem);
        }},
        () => {
            return alert("failed");
        }
    )
}     
addButton.addEventListener("click", addToDo);

function createNewItem(newValue) {
    let newItem = document.createElement("li");
    newItem.textContent = newValue;
    let delButton = document.createElement("span");
    delButton.textContent = "x";
    delButton.className = "delButton";
    newItem.appendChild(delButton);
    itemList.prepend(newItem);
    delButton.addEventListener("click", removeItem);
}
