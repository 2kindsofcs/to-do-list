let addButton = document.getElementById("addButton");
let todoContent = document.getElementById("todoContent")
let itemList = document.getElementById("itemList")
itemList.addEventListener("click", function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle("checked");
    } 
})
let addToDo = function () {
    makeNewItem();   
}
let removeItem = function (e) {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode)
}     
let makeNewItem = function () {
    if (todoContent.value) {
        let newItem = document.createElement("li");
        newItem.textContent = todoContent.value;
        let delButton = document.createElement("span");
        delButton.textContent = "x";
        delButton.className = "delButton";
        newItem.appendChild(delButton);
        itemList.appendChild(newItem);
        delButton.addEventListener("click", removeItem);    
    }  
}
addButton.addEventListener("click", addToDo);