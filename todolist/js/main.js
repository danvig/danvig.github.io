/*

    JavaScript File for To-Do List
    Author: Daniel Viglietti
    Original Source: https://www.youtube.com/watch?v=-pRg_daFjfk
    Date: 17/02/2020

*/

let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');

// ADD ITEMS TO LIST #1
addToDoButton.addEventListener('click', function() {
    var paragraph = document.createElement('p');
    paragraph.classList.add('paragraph-styling');
    paragraph.innerText = inputField.value;
    toDoContainer.appendChild(paragraph);
    inputField.value='';

    // STRIKE OUT ITEMS
    paragraph.addEventListener('click', function(){
        paragraph.style.textDecoration = "line-through";
    });

    // REMOVE ITEMS
    paragraph.addEventListener('dblclick', function(){
        toDoContainer.removeChild(paragraph);
    });
})

// ADD ITEMS TO LIST #2
inputField.addEventListener('keyup', (e) => {
    if(e.keyCode === 13)
    {
        var paragraph = document.createElement('p');
        paragraph.classList.add('paragraph-styling');
        paragraph.innerText = inputField.value;
        toDoContainer.appendChild(paragraph);
        inputField.value='';
    }

    // STRIKE OUT ITEMS
    paragraph.addEventListener('click', function(){
        paragraph.style.textDecoration = "line-through";
    });

    // REMOVE ITEMS
    paragraph.addEventListener('dblclick', function(){
        toDoContainer.removeChild(paragraph);
    });
})